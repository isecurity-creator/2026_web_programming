const num = Math.floor( Math.random() * 6 + 1 );

let luck = '';

switch (num) {
    case 1:
        luck = '大吉';
        break;
    case 2:
        luck = '吉';
        break;
    case 3:
        luck = '中吉';
        break;
    case 4:
        luck = '小吉';
        break;
    case 5:
        luck = '凶';
        break;
    case 6:
        luck = '大凶';
        break;
    default:
        break;
}


console.log('あなたの運勢は' + luck + 'です');