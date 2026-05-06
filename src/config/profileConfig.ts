import type { ProfileConfig } from "../types/config";

export const profileConfig: ProfileConfig = {
	// 头像
	// 图片路径支持三种格式：
	// 1. public 目录（以 "/" 开头，不优化）："/assets/images/avatar.webp"
	// 2. src 目录（不以 "/" 开头，自动优化但会增加构建时间，推荐）："assets/images/avatar.webp"
	// 3. 远程 URL："https://example.com/avatar.jpg"
	avatar: "assets/images/a.jpg",

	// 名字
	name: "7a7a68",

	// 个人签名
	bio: "愿你明日如绚丽之花.",

	// 链接配置
	// 已经预装的图标集：fa7-brands，fa7-regular，fa7-solid，material-symbols，simple-icons
	// 访问https://icones.js.org/ 获取图标代码，
	// 如果想使用尚未包含相应的图标集，则需要安装它
	// `pnpm add @iconify-json/<icon-set-name>`
	// showName: true 时显示图标和名称，false 时只显示图标
	links: [
			{
				name: "GitHub",
				url: "https://github.com/LJTHCX",
				icon: "fa7-brands:github",
			},
			{
				name: "leetcode",
				url: "https://leetcode.cn/u/7a7a68/",
				icon: "fa7-brands:leetcode",
			},
			{
				name: "Codeforces",
				url: "https://codeforces.com/profile/7a7a68",
				icon: "simple-icons:codeforces",
			},
			{
				name: "洛谷",
				url: "https://www.luogu.com.cn/user/1736929",
				icon: "simple-icons:luogu",
			},
			{
				name: "AtCoder",
				url: "https://atcoder.jp/",
				icon: "simple-icons:codio", 
			},
			{
				name: "哔哩哔哩",
				url: "https://account.bilibili.com/account/home?spm_id_from=333.1387.0.0",
				icon: "simple-icons:bilibili",
			},
	],
};
