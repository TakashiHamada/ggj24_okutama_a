var app = new Vue({
    el: '#app',
    data: {
        handleEnterPromise: null,
        userInput: '',
        state: 'init',
        answer: '',
        explanation: '',
        image: '',
        loadingMessage: '',
        enemy: '',
        anger: 1,
        life: 99,
        inputDisable: true,
        waitForInputFlg: false,
        messageIdx: 0,
    },
    computed: { // getter
    },
    created: async function () {
        
        console.log(enemies);
        
        this.enemy = enemies[0];
        console.log(this.enemy);
        this.anger = this.enemy.anger;
        this.life = this.enemy.playerLife;
        this.messages = this.enemy.messages;
        this.image = "image/" + this.enemy.name + ".jpg";

        while (true) {
            // 初期化
            this.userInput = "";
            this.waitForInputFlg = false;
            this.inputDisable = true;

            // enemy
            console.log("enemy");
            await this.enemyAttack();
            if (this.life < 0)
                await this.gameOver(); // リロードされるので終了
            
            // player
            console.log("player");
            this.inputDisable = false;
            await this.waitForInput();
            if (this.anger < 0) {
                console.log("win!")
                await this.gameOver();
            }
        }
    },
    methods: {
        async enemyMessageProcess() {
            while (true) {
                this.updateLoadingMessage();
                await this.delay(5);
            }
        },
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
                    character: this.enemy.name,
                    message: value,
                }
            });

            this.state = "";
            this.answer = "=>" + response.data.answer;
            this.explanation = "=>" + response.data.explanation;
            
            // todo, tmp
            this.anger -= response.data.answer;
            this.enemyDamageEffect(3);
        },
        playSe(fileName) {
            var sound = new Howl({
                src: ['se/' + fileName + '.mp3']
            });

            sound.play();
        },
        updateLoadingMessage() {
            // let messages = [
            //     "部長「誰が死ぬほど仕事してお前らを引っ張ってると思っているんだ！」",
            //     "社員「部長、ハイブランドの靴とかYシャツを全員にスルーされたとか」",
            //     "部長「常務はオレの仕事を無視してるのか！ふざけやがって！」",
            //     "社員「上の人たちに仕事を評価されてないってキレてたな。部長」",
            //     "部長「（スマホ観て）早く帰ってきて犬の世話もやれだと！？」",
            //     "社員「ああみえて家庭のこともやっているみたい。意外だよね」",
            // ];
            let messages = this.enemy.messages;
            this.loadingMessage = messages[this.messageIdx % messages.length];
            this.messageIdx++;
        },
        async enemyAttack() {
            await this.delay(1);
            this.life -= this.anger;
        },
        async gameOver() {
            console.log("game over");
            await this.delay(1);
            window.location.reload()
        },
        async enemyDamageEffect(times = 0, interval = 0.05) {
            for (let time = 0; time < times; time++) {

                let name = this.enemy.name;
                this.image = "image/" + name + "_damage.jpg";
                await this.delay(interval);
                this.image = "image/" + name + ".jpg";
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