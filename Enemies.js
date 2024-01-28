var enemies = [
    new Enemy("buchou", 1, 500, [
            "部長「誰が死ぬほど仕事してお前らを引っ張ってると思っているんだ！」",
            "社員「部長、ハイブランドの靴とかYシャツを全員にスルーされたとか」",
            "部長「常務はオレの仕事を無視してるのか！ふざけやがって！」",
            "社員「上の人たちに仕事を評価されてないってキレてたな。部長」",
            "部長「（スマホ観て）早く帰ってきて犬の世話もやれだと！？」",
            "社員「ああみえて家庭のこともやっているみたい。意外だよね」",
        ]
        ,),
    new Enemy("goblin", 2, 1000,
        [
            "a",
            "b",
        ]),
    new Enemy("maou", 3, 1500,
        [
            "e",
            "f",
        ])
];

function Enemy(name, anger, playerLife, messages) {
    this.name = name;
    this.anger = anger;
    this.playerLife = playerLife;
    this.messages = messages;
}