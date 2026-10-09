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



app.listen(8080, () => console.log("Example app listening on port 8080!"));
