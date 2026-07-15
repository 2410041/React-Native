import type { Href } from "expo-router";

export type NotificationCategory = "store" | "priceRevision" | "important";

export type Notification = {
	id: string;
	category: NotificationCategory;
	title: string;
	body: string;
	createdAt: string;
	read: boolean;
	important: boolean;
	linkTo?: Href;
};
