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
    },
    computed: { // getter
    },
    created: async function () {

        this.reset(this.enemyIdx);
        
        this.enemyMessageProcess();

        while (true) {
            // 初期化
            this.waitForInputFlg = false;

            // enemy
            this.state = "👹 敵の攻撃";
            await this.enemyAttack();
            if (this.life < 0)
                await this.gameOver(); // リロードされるので終了

            // player
            this.state = "😊 あなたのターン";
            this.inputDisable = false;
            this.userInput = "";
            await this.waitForInput();
            if (this.anger < 0) {
                this.enemyIdx++;
                
                // 完全クリア
                if (2 < this.enemyIdx)
                {
                    console.log("Completed!");
                    return;
                }
                
                this.enemy = enemies[this.enemyIdx];
                this.reset(this.enemyIdx);
                console.log("win!")
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
        },
        async enemyAttack() {
            await this.delay(2);
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