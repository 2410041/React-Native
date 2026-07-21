function getProductDisplayStatus(handlingStatus) {
	switch (handlingStatus) {
		case "取扱いあり":
			return {
				code: "available",
				label: "取り扱いあり",
				message: "売り場でお探しください。売り場の状況は変動する場合があります。",
			};
		case "取扱いなし":
			return {
				code: "unavailable",
				label: "取り扱いなし",
				message: "現在、この店舗では取り扱っておりません。",
			};
		case "一時休止":
		case "不明":
		default:
			return {
				code: "unknown",
				label: "確認中",
				message: "現在、売り場に出ていない可能性があります。お近くの従業員にご確認ください。",
			};
	}
}

module.exports = { getProductDisplayStatus };
