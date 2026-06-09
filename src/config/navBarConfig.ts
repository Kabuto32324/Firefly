import {
	LinkPreset,
	type NavBarConfig,
	type NavBarLink,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/config";
import { siteConfig } from "./siteConfig";

// 根据页面开关动态生成导航栏配置
const getDynamicNavBarConfig = (): NavBarConfig => {
	// 基础导航栏链接
	const links: (NavBarLink | LinkPreset)[] = [
		// 主页
		LinkPreset.Home,
	];

	// 文章及其子菜单
	links.push({
		name: "文章",
		url: "/post/",
		icon: "material-symbols:article-rounded",
		children: [
			// 归档
			LinkPreset.Archive,
			// 分类
			LinkPreset.Categories,
			// 标签
			LinkPreset.Tags,
		],
	});

	// 根据配置决定是否添加友链
	if (siteConfig.pages.friends) {
		links.push(LinkPreset.Friends);
	}

	// 我的及其子菜单
	links.push({
		name: "我的",
		url: "/my/",
		icon: "material-symbols:person",
		children: [
			// 相册
			...(siteConfig.pages.gallery ? [LinkPreset.Gallery] : []),
			// 图床
			{
				name: "图床",
				url: "https://img.mistfly.xyz/",
				icon: "material-symbols:image",
				external: true,
			},
		],
	});

	// 关于及其子菜单
	const aboutChildren: (NavBarLink | LinkPreset)[] = [];

	// 留言板放到"关于"下
	if (siteConfig.pages.guestbook) {
		aboutChildren.push({
			name: "留言板",
			url: "/guestbook/",
			icon: "material-symbols:chat",
		});
	}

	// 赞助
	if (siteConfig.pages.sponsor) {
		aboutChildren.push(LinkPreset.Sponsor);
	}

	// 关于页面
	aboutChildren.push(LinkPreset.About);

	links.push({
		name: "关于",
		url: "/content/",
		icon: "material-symbols:info",
		children: aboutChildren,
	});

	// 仅返回链接，其它导航搜索相关配置在模块顶层常量中独立导出
	return { links } as NavBarConfig;
};

// 导航搜索配置
export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};

export const navBarConfig: NavBarConfig = getDynamicNavBarConfig();
