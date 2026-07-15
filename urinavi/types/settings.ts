export type FontSizeOption = "small" | "medium" | "large";
export type ThemeOption = "light" | "system";
export type DefaultDepartmentOption = "normal" | "all";

export type AppSettings = {
	notificationsEnabled: boolean;
	vibrationEnabled: boolean;
	scanSoundEnabled: boolean;
	fontSize: FontSizeOption;
	theme: ThemeOption;
	defaultDepartment: DefaultDepartmentOption;
};

export const defaultAppSettings: AppSettings = {
	notificationsEnabled: true,
	vibrationEnabled: true,
	scanSoundEnabled: true,
	fontSize: "medium",
	theme: "light",
	defaultDepartment: "normal",
};
