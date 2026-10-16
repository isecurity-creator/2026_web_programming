const session = require("express-session");
const express = require("express");
const path = require('path');
const app = express();



function getomikuji(){
    const num = Math.floor( Math.random() * 6 + 1 );
    let luck, msg = '';
    switch (num) {
        case 1:
            luck = '大吉';
            msg = '最高の運勢です！何をやってもうまくいく予感。新しいことに挑戦するなら今がチャンス！';
            break;
        case 2:
            luck = '吉';
            msg = 'とても良い運勢です！何事も順調に進みそう。自信を持って行動してみましょう！';
            break;
        case 3:
            luck = '中吉';
            msg = 'まずまずの運勢です！小さな幸せが見つかるかも。周りの人との交流を大切にしましょう！';
            break;
        case 4:
            luck = '小吉';
            msg = 'ちょっぴり良いことがありそうな一日。焦らず自分のペースで進めば、きっと良い結果につながります！';
            break;
        case 5:
            luck = '凶';
            msg = '今日は少し注意が必要かも。思わぬトラブルに備えて、慎重な行動を心がけましょう！';
            break;
        case 6:
            luck = '大凶';
            msg = '今日は何をやっても空回りしてしまうかも……。無理に行動せず、ゆっくり休んで運気の回復を待ちましょう！';
            break;
        default:
            break;
    }
    return {luck, msg};
}


app.set('view engine', 'ejs');
app.use("/public", express.static(path.join(__dirname + "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "development-secret-change-this",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, "public")));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/english", (req, res) => {
  res.render('greeting', {message: "Good Morning."});
});

app.get("/french", (req, res) => {
  res.render('greeting', {message: "Bon jour."});
});

app.get("/german", (req, res) => {
  res.render('greeting', {message: "Guten Morgen."});
});

app.get("/soviet", (req, res) => {
  res.render('greeting', {message: "粛清"});
});

app.get("/omikuji1", (req, res) => {
  let {luck, msg} = getomikuji();
  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  let {luck, msg} = getomikuji();
  res.render( 'omikuji2', {result:luck} );
});

app.get("/omikuji3", (req, res) => {
  let {luck, msg} = getomikuji();
  res.render('omikuji3', {result:luck, comment:msg} );
});

// 数あてゲームの画面を表示
app.get("/guess", (req, res) => {

    // 正解がまだ設定されていなければ乱数を生成
    if (req.session.answer === undefined) {
        req.session.answer = Math.floor(Math.random() * 100) + 1;
    }

    res.render("guess", {
        message: "1〜100の数字を当てて、どうぞ。",
        finished: false
    });
});


// ユーザーからの回答を受信
app.post("/guess", (req, res) => {

    // 正解の数字を取得
    const answer = req.session.answer;

    // セッションが存在しない場合はゲームを開始し直す
    if (answer === undefined) {
        return res.redirect("/guess");
    }

    // ユーザーの入力値を取得
    const input = req.body.number;
    const num = Number(input);

    // 入力値のチェック
    if (
        typeof input !== "string" ||
        input.trim() === "" ||
        !Number.isInteger(num) ||
        num < 1 ||
        num > 100
    ) {
        return res.render("guess", {
            message: "1〜100の整数を入力して、どうぞ。",
            finished: false
        });
    }

    let message = "";
    let finished = false;

    // 正解と入力値を比較
    if (num > answer) {
        message = "お前値大きスギィ！";
    } else if (num < answer) {
        message = "お前値小さスギィ！";
    } else {
        message = "お前やりますねスギィ！";
        finished = true;

        // 正解したので保存していた数字を削除
        delete req.session.answer;
    }

    // 結果を表示
    res.render("guess", {
        message: message,
        finished: finished
    });
});



app.listen(8080, () => console.log("Example app listening on port 8080!"));
