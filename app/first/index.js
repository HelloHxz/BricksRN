import {Run,Theme} from "react-bricks"

Theme.extend(Theme,{});

var config = {
	root:"home",
	pages:{
		home:require("./main/pages/home").default,
		chat:require("./main/pages/chat").default,
		setting	:require("./main/pages/setting").default,
		my:require("./main/pages/my").default,
		buttonDemo:require("./main/pages/buttonDemo").default,
		iconDemo:require("./main/pages/iconDemo").default,
		imageDemo:require("./main/pages/imageDemo").default,
		swiperDemo:require("./main/pages/swiperDemo").default,
		popoverDemo:require("./main/pages/popoverDemo").default,
		poplayerDemo:require("./main/pages/poplayerDemo").default,
		
	},
};
export default Run(config)