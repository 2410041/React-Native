import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

import { departments } from "@/data/departments";
import { findEmployeeByNumber } from "@/data/employees";
import { notifications as initialNotifications } from "@/data/notifications";
import { priceRevisionItems } from "@/data/priceRevision";
import { getProductById } from "@/data/products";
import { initialSearchHistory } from "@/data/searchHistory";
import { getStoreById, stores } from "@/data/stores";
import { DepartmentCode } from "@/types/department";
import { Employee } from "@/types/employee";
import { Notification } from "@/types/notification";
import { PriceRevisionItem } from "@/types/priceRevision";
import { RecentProduct } from "@/types/recentProduct";
import { AppSettings, defaultAppSettings } from "@/types/settings";
import { Store } from "@/types/store";

export type SelectedDepartment = DepartmentCode | "all";

export type PriceRevisionStatus = "idle" | "selected" | "loading" | "result" | "error";

export type PriceRevisionSession = {
	status: PriceRevisionStatus;
	fileName: string | null;
	itemCount: number;
	items: PriceRevisionItem[];
};

type AppContextValue = {
	isLoggedIn: boolean;
	employee: Employee | null;
	store: Store | null;
	login: (employeeNumber: string) => boolean;
	logout: () => void;

	currentDepartment: SelectedDepartment;
	isHelpingOtherDepartment: boolean;
	setCurrentDepartment: (code: SelectedDepartment) => void;
	resetToNormalDepartment: () => void;

	history: RecentProduct[];
	addHistory: (productId: string) => void;
	clearHistory: () => void;

	notifications: Notification[];
	unreadNotificationCount: number;
	markNotificationRead: (id: string) => void;
	markAllNotificationsRead: () => void;

	settings: AppSettings;
	updateSettings: (partial: Partial<AppSettings>) => void;

	searchHistory: string[];
	addSearchHistory: (keyword: string) => void;
	clearSearchHistory: () => void;

	priceRevision: PriceRevisionSession;
	selectPriceRevisionFile: () => void;
	startPriceRevisionCheck: () => void;
	simulatePriceRevisionError: () => void;
	resetPriceRevisionCheck: () => void;
	togglePriceRevisionCheckState: (id: string) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

const emptyPriceRevisionSession: PriceRevisionSession = {
	status: "idle",
	fileName: null,
	itemCount: 0,
	items: [],
};

export function AppProvider({ children }: { children: ReactNode }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [employee, setEmployee] = useState<Employee | null>(null);
	const [store, setStore] = useState<Store | null>(null);
	const [currentDepartment, setCurrentDepartmentState] = useState<SelectedDepartment>("all");

	const [history, setHistory] = useState<RecentProduct[]>([]);
	const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
	const [settings, setSettings] = useState<AppSettings>(defaultAppSettings);
	const [searchHistory, setSearchHistory] = useState<string[]>(initialSearchHistory);
	const [priceRevision, setPriceRevision] = useState<PriceRevisionSession>(
		emptyPriceRevisionSession
	);

	const login = useCallback(
		(employeeNumberText: string) => {
			const employeeNumber = Number(employeeNumberText);
			const matched = findEmployeeByNumber(employeeNumber);
			if (!matched) return false;
			const matchedStore = getStoreById(matched.storeId) ?? stores[0];
			setEmployee(matched);
			setStore(matchedStore);
			setCurrentDepartmentState(
				settings.defaultDepartment === "all" ? "all" : matched.normalDepartmentCode
			);
			setIsLoggedIn(true);
			return true;
		},
		[settings.defaultDepartment]
	);

	const logout = useCallback(() => {
		setIsLoggedIn(false);
		setEmployee(null);
		setStore(null);
	}, []);

	const setCurrentDepartment = useCallback((code: SelectedDepartment) => {
		setCurrentDepartmentState(code);
	}, []);

	const resetToNormalDepartment = useCallback(() => {
		setEmployee((current) => {
			if (current) {
				setCurrentDepartmentState(current.normalDepartmentCode);
			}
			return current;
		});
	}, []);

	const isHelpingOtherDepartment =
		employee !== null &&
		currentDepartment !== "all" &&
		currentDepartment !== employee.normalDepartmentCode;

	const addHistory = useCallback((productId: string) => {
		setHistory((current) => {
			const withoutExisting = current.filter((h) => h.productId !== productId);
			return [{ productId, viewedAt: new Date().toISOString() }, ...withoutExisting].slice(
				0,
				50
			);
		});
	}, []);

	const clearHistory = useCallback(() => {
		setHistory([]);
	}, []);

	const unreadNotificationCount = notifications.filter((n) => !n.read).length;

	const markNotificationRead = useCallback((id: string) => {
		setNotifications((current) =>
			current.map((n) => (n.id === id ? { ...n, read: true } : n))
		);
	}, []);

	const markAllNotificationsRead = useCallback(() => {
		setNotifications((current) => current.map((n) => ({ ...n, read: true })));
	}, []);

	const updateSettings = useCallback((partial: Partial<AppSettings>) => {
		setSettings((current) => ({ ...current, ...partial }));
	}, []);

	const addSearchHistory = useCallback((keyword: string) => {
		const trimmed = keyword.trim();
		if (!trimmed) return;
		setSearchHistory((current) => {
			const withoutExisting = current.filter((k) => k !== trimmed);
			return [trimmed, ...withoutExisting].slice(0, 10);
		});
	}, []);

	const clearSearchHistory = useCallback(() => {
		setSearchHistory([]);
	}, []);

	const selectPriceRevisionFile = useCallback(() => {
		setPriceRevision({
			status: "selected",
			fileName: "価格改定リスト_2026年8月.xlsx",
			itemCount: priceRevisionItems.length,
			items: [],
		});
	}, []);

	const startPriceRevisionCheck = useCallback(() => {
		setPriceRevision((current) => ({ ...current, status: "loading" }));
		setTimeout(() => {
			setPriceRevision((current) => {
				if (current.status !== "loading") return current;
				return {
					...current,
					status: "result",
					items: priceRevisionItems.map((item) => ({ ...item })),
				};
			});
		}, 1200);
	}, []);

	const simulatePriceRevisionError = useCallback(() => {
		setPriceRevision((current) => ({ ...current, status: "error" }));
	}, []);

	const resetPriceRevisionCheck = useCallback(() => {
		setPriceRevision(emptyPriceRevisionSession);
	}, []);

	const togglePriceRevisionCheckState = useCallback((id: string) => {
		setPriceRevision((current) => ({
			...current,
			items: current.items.map((item) =>
				item.id === id
					? {
							...item,
							checkState: item.checkState === "確認済み" ? "未確認" : "確認済み",
						}
					: item
			),
		}));
	}, []);

	const value = useMemo<AppContextValue>(
		() => ({
			isLoggedIn,
			employee,
			store,
			login,
			logout,
			currentDepartment,
			isHelpingOtherDepartment,
			setCurrentDepartment,
			resetToNormalDepartment,
			history,
			addHistory,
			clearHistory,
			notifications,
			unreadNotificationCount,
			markNotificationRead,
			markAllNotificationsRead,
			settings,
			updateSettings,
			searchHistory,
			addSearchHistory,
			clearSearchHistory,
			priceRevision,
			selectPriceRevisionFile,
			startPriceRevisionCheck,
			simulatePriceRevisionError,
			resetPriceRevisionCheck,
			togglePriceRevisionCheckState,
		}),
		[
			isLoggedIn,
			employee,
			store,
			login,
			logout,
			currentDepartment,
			isHelpingOtherDepartment,
			setCurrentDepartment,
			resetToNormalDepartment,
			history,
			addHistory,
			clearHistory,
			notifications,
			unreadNotificationCount,
			markNotificationRead,
			markAllNotificationsRead,
			settings,
			updateSettings,
			searchHistory,
			addSearchHistory,
			clearSearchHistory,
			priceRevision,
			selectPriceRevisionFile,
			startPriceRevisionCheck,
			simulatePriceRevisionError,
			resetPriceRevisionCheck,
			togglePriceRevisionCheckState,
		]
	);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
	const ctx = useContext(AppContext);
	if (!ctx) {
		throw new Error("useApp must be used within an AppProvider");
	}
	return ctx;
}

export function useDepartmentName(code: DepartmentCode): string {
	return departments.find((d) => d.code === code)?.name ?? code;
}

export function useRecentProducts() {
	const { history } = useApp();
	return history
		.map((h) => ({ entry: h, product: getProductById(h.productId) }))
		.filter((h): h is { entry: RecentProduct; product: NonNullable<ReturnType<typeof getProductById>> } =>
			Boolean(h.product)
		);
}
