var app = new Vue({
    el: '#app',
    data: {
        handleEnterPromise: null,
        userInput: '',
        state: 'init',
        answer: '',
        explanation: '',
        image: 'image/goblin.jpg',
        loadingMessage: '',
        enemy: 'goblin',
        anger: 100,
        life: 1000,
        inputDisable: true,
        waitForInputFlg: false,
        messageIdx: 0,
    },
    computed: { // getter
    },
    created: async function () {

        this.enemyDamageEffect(3);
        
        while (true) {
            this.updateLoadingMessage();
            await this.delay(5);
        }

        while (true) {
            // 初期化
            this.userInput = "";
            this.waitForInputFlg = false;
            this.inputDisable= true;
            
            // enemy
            console.log("enemy");
            await this.enemyAttack();
            
            // player
            console.log("player");
            this.inputDisable = false;
            await this.waitForInput();
            
        }
    },
    methods: {
        async waitForInput() {
            while (!this.waitForInputFlg) {
                await this.delay(0.1);
            }
        },
        async handleEnter() {
            this.playSe("cat");
            await this.connectAip(this.userInput);

            this.waitForInputFlg = true;
        },
        async connectAip(value) {

            let url = "https://demo.cotonoha.io/ggj2024/homekotoba";

            const response = await axios.get(url, {
                params: {
                    character: "goblin",
                    message: value,
                }
            });

            this.state = "";
            this.answer = "=>" + response.data.answer;
            this.explanation = "=>" + response.data.explanation;
        },
        playSe(fileName) {
            var sound = new Howl({
                src: ['se/' + fileName + '.mp3']
            });

            sound.play();
        },
        updateLoadingMessage() {
            let messages = [
                "部長「誰が死ぬほど仕事してお前らを引っ張ってると思っているんだ！」\n"
                + "社員「部長、ハイブランドの靴とかYシャツを着てても全員にスルーされたとか。似合ってないんで私ら笑っちゃったけど」",
                "社員「上の人たちに仕事を評価されてないってキレてたなー。誰かほめてもいいんじゃない。私は嫌だけど」",
                "部長「（スマホを観ながら）あああ～！ 早く帰ってきて犬の世話もやれだと！？ 会社の仕事が終わってないんだよ！」\n"
                + "社員「ああみえて家庭のこともやっているみたい。意外だよね」"
            ];
            this.loadingMessage = messages[this.messageIdx % messages.length];
            this.messageIdx++;
        },
        async enemyAttack() {
            await this.delay(1);
            this.life -= this.anger;
        },
        gameOver() {
            console.log();
        },
        async enemyDamageEffect(times = 0, interval = 0.05) {
            for (let time = 0; time < times; time++) {

                this.image = 'image/goblin_damage.jpg';
                await this.delay(interval);
                this.image = 'image/goblin.jpg';
                await this.delay(interval);
            }
        },
        delay(n) {
            return new Promise(function (resolve) {
                setTimeout(resolve, n * 1000);
            });
        }
    }
})