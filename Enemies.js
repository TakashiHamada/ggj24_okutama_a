var enemies = [
    new Enemy("buchou", 1, 500, [
            "a",
            "b",
        ]
        ,),
    new Enemy("goblin", 2, 1000,
        [
            "c",
            "d",
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