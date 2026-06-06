import type { ProfileConfig } from "../types/config";

export const profileConfig: ProfileConfig = {
	// 头像
	avatar: "assets/images/avatar.jpg",

	// 名字
	name: "拾光",

	// 个人签名
	bio: "拾取散落的时光碎片",

	// 链接配置
	links: [
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/kabuto32324",
			showName: false,
		},
		{
			name: "Email",
			icon: "fa7-solid:envelope",
			url: "mailto:a2709928366@163.com",
			showName: false,
		},
		{
			name: "抖音",
			icon: "fa7-brands:tiktok",
			url: "https://www.douyin.com/user/774552089",
			showName: false,
		},
		{
			name: "RSS",
			icon: "fa7-solid:rss",
			url: "/rss/",
			showName: false,
		},
	],
};
