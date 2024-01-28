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
        enemyIdx: 0,
        state: "init",
        mode: "main_game",
    },
    computed: { // getter
    },
    created: async function () {

        this.reset(this.enemyIdx);

        this.enemyMessageProcess();

        while (true) {
            // 初期化
            this.waitForInputFlg = false;

            // player
            this.state = "😊 あなたのターン";
            this.inputDisable = false;
            this.userInput = "";
            await this.waitForInput();
            if (this.anger < 0) {

                this.image = "image/" + this.enemy.name + "_laugh.jpg";
                this.playSe("Winnig_Laugh");
                await this.delay(5);

                this.enemyIdx++;

                // 完全クリア
                if (2 < this.enemyIdx) {
                    this.mode = "game_clear";
                    console.log("Completed!");
                    return;
                } else {
                    // 次のステージへ
                    this.reset(this.enemyIdx);
                    continue;
                }
            }

            // enemy
            this.state = "👹 敵の攻撃";
            await this.enemyAttack();
            if (this.life < 0)
                await this.gameOver(); // リロードされるので終了
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
            this.answer = "loading...";
            this.playSe("Cheer_sound");
            this.inputDisable = true;
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

            this.answer = "💕 " + response.data.answer;
            this.explanation = "🧚 " + response.data.explanation;

            // todo, tmp
            this.anger -= response.data.answer;
            await this.enemyDamageEffect(3);
        },
        playSe(fileName) {
            var sound = new Howl({
                src: ['se/' + fileName + '.mp3']
            });

            sound.play();
        },
        updateLoadingMessage() {
            let messages = this.enemy.messages;
            this.loadingMessage = messages[this.messageIdx % messages.length];
            this.messageIdx++;
        },
        reset(idx) {
            this.enemy = enemies[idx];
            this.anger = this.enemy.anger;
            this.life = this.enemy.playerLife;
            this.messages = this.enemy.messages;
            this.image = "image/" + this.enemy.name + ".jpg";
            this.answer = "";
            this.explanation = "";
        },
        async enemyAttack() {
            await this.delay(1);
            this.playSe("enemy_attack");
            await this.delay(1.5);
            this.life -= this.anger;
        },
        async gameOver() {
            console.log("game over");
            this.mode = "game_over";
            await this.delay(2);
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