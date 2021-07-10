'use strict';

let correctAnswerCount = 0;                                                                             //正解解答数格納用の変数宣言
let count = 0;                                                                                          //取得クイズカウント用変数宣言
let questionNumber = 1;                                                                                 //クイズNo.格納用変数宣言
const quizList = [];

class Quiz {                                                                                            //Quizクラス定義
  constructor(category, difficulty, question, correctAnswer, incorrectAnswerA, incorrectAnswerB, incorrectAnswerC) { 
    this.category = category;                                                                            //カテゴリプロパティ
    this.difficulty = difficulty;                                                                        //難易度プロパティ
    this.question = question;                                                                            //問題文プロパティ
    this.correctAnswer = correctAnswer;                                                                   //正解プロパティ
    this.incorrectAnswerA = incorrectAnswerA;                                                            //不正解-1プロパティ
    this.incorrectAnswerB = incorrectAnswerB;                                                            //不正解-2プロパティ
    this.incorrectAnswerC = incorrectAnswerC;                                                            //不正解-3プロパティ
  } 
  shuffle(arr) {                                                                                         //配列の値をシャッフルするメソッド
    for (let j = arr.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [arr[k], arr[j]] = [arr[j], arr[k]];
    }
    return arr;
  }
  outDisplay() {                                                                                         //クイズ画面出力メソッド定義
    const categoryNode = document.createElement('div');                                                   //カテゴリ出力用の要素作成
    const difficultyNode = document.createElement('div');                                                 //難易度出力用の要素作成
    const answerBtnA = document.createElement('input');                                                   //解答選択肢-1用の要素作成
    const answerBtnB = document.createElement('input');                                                   //解答選択肢-2用の要素作成
    const answerBtnC = document.createElement('input');                                                   //解答選択肢-3用の要素作成
    const answerBtnD = document.createElement('input');                                                   //解答選択肢-4用の要素作成

    answerBtnA.type = 'button';                                                                           //各解答選択肢用要素のタイプ設定
    answerBtnB.type = 'button';
    answerBtnC.type = 'button';
    answerBtnD.type = 'button';

    categoryNode.id = 'category';                                                                         //各要素のID設定
    difficultyNode.id = 'difficulty';
    answerBtnA.id = 'btnA';
    answerBtnB.id = 'btnB';
    answerBtnC.id = 'btnC';
    answerBtnD.id = 'btnD';

    categoryNode.style.fontWeight = 'bold';                                                               //各div要素-フォントの重さ設定
    difficultyNode.style.fontWeight = 'bold';
    answerBtnA.style.margin = '0 0 0.5em 0';                                                              //各input要素-マージン設定
    answerBtnB.style.margin = '0 0 0.5em 0';
    answerBtnC.style.margin = '0 0 0.5em 0';
    answerBtnD.style.margin = '0 0 0.5em 0';
    answerBtnA.style.display = 'block';                                                                   //各input要素-表示型設定
    answerBtnB.style.display = 'block';
    answerBtnC.style.display = 'block';
    answerBtnD.style.display = 'block';

    categoryNode.textContent = '【ジャンル】' + this.category;                                            //カテゴリ出力用要素の出力内容代入
    difficultyNode.textContent = '【難易度】' + this.difficulty;                                          //難易度出力用要素の出力内容代入
    operation.textContent = this.question;                                                                //問題文出力内容の代入

    const answers = [this.correctAnswer, this.incorrectAnswerA, this.incorrectAnswerB, this.incorrectAnswerC];
    const shuffleAnswers = this.shuffle([...answers]);

    answerBtnA.value = shuffleAnswers[0];                                                                      //解答選択肢-1出力用要素の値代入
    answerBtnB.value = shuffleAnswers[1];                                                                      //解答選択肢-2出力用要素の値代入
    answerBtnC.value = shuffleAnswers[2];                                                                      //解答選択肢-3出力用要素の値代入
    answerBtnD.value = shuffleAnswers[3];                                                                      //解答選択肢-4出力用要素の値代入

    title.after(categoryNode);                                                                            //各要素の出力
    category.after(difficultyNode);
    document.body.appendChild(answerBtnA);
    document.body.appendChild(answerBtnB);
    document.body.appendChild(answerBtnC);
    document.body.appendChild(answerBtnD);

    const selectedAnswers = document.getElementsByTagName('input')                                   //動的生成されたinputノードの取得
    for (let selectedAnswer of selectedAnswers) {                                                    //解答選択肢1~4押下時処理
      selectedAnswer.addEventListener('click', () => {
        if(selectedAnswer.value === answers[0]){
          correctAnswerCount++;                                                                             //正解回答数インクリメント
        } 
      });
    }
  }
}

window.addEventListener('load', () => {                                                                  //画面ロード後の処理
  const startQuiz = document.getElementById('start-quiz');                                                //開始ボタンノード取得
  const title = document.getElementById('title');                                                         //タイトルノード取得
  const operation = document.getElementById('operation');                                                 //問題文出力用ノード取得

  startQuiz.addEventListener('click', async () => {                                                       //開始ボタン押下時処理
    try{
      title.textContent = '取得中';
      operation.textContetn = '少々お待ちください';
      startQuiz.remove();
      await sendApiRequest();
    } 
    catch(e) {
      console.error(`rejectされました。理由 => ${e}`);
    }
  });
  
  async function sendApiRequest() {                                                                             //APIリクエスト送信関数実行
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple')                       //リクエスト送信
      if (!response.ok) {
        new Error('エラーレスポンス');
      }
      const json = await response.json()                                                                        //JSON抽出-クイズ一覧取
      console.log(json.results);
      json.results.forEach((quizData) => {
        quizList.push(
          new Quiz(
            quizData.category,
            quizData.difficulty,
            quizData.question,
            quizData.correct_answer,
            quizData.incorrect_answers[0],
            quizData.incorrect_answers[1],
            quizData.incorrect_answers[2]
          )
        )
      });
      quizList[0].outDisplay();
      title.textContent = `問題${questionNumber}`;                                                      //タイトルノード編集
      selectAnswer();                                                                                   //解答関数実行
    }
    catch(e) {
      console.error(e);
    } 
  }

  function selectAnswer() {                                                                         //解答関数-解答ボタン押下時処理
    const selectedAnswers = document.getElementsByTagName('input')                                   //動的生成されたinputノードの取得
    for (let selectedAnswer of selectedAnswers) {                                                    //解答選択肢1~4押下時処理
      selectedAnswer.addEventListener('click', () => {
        
        category.remove();                                                                           //カテゴリ消去
        difficulty.remove();                                                                         //難易度消去
        btnA.remove();                                                                               //解答選択肢-1消去
        btnB.remove();                                                                               //解答選択肢-2消去
        btnC.remove();                                                                               //解答選択肢-3消去
        btnD.remove();                                                                               //解答選択肢-4消去

        count++;                                                                                     //取得クイズ数カウントインクリメント
        questionNumber++;                                                                            //クイズNo.インクリメント

        if (count < 10) {                                                                             //クイズ一覧存在時処理
          title.textContent = `問題${questionNumber}`;                                                //タイトル列編集
          quizList[count].outDisplay();                                                                //クイズ画面出力メソッド実行
          selectAnswer();                                                                             //解答関数実行
        }
        else {                                                                                      //結果出力画面表示処理
          title.textContent = `あなたの正答数は${correctAnswerCount}です！！`;                       //タイトル出力ノード編集
          operation.textContent = '再度チャレンジしたい場合は以下をクリック！！';                    //問題文出力ノード編集
          const homeBtn = document.createElement('input');                                           //リロードボタン用の要素作成
          homeBtn.type = 'button';                                                                   //リロードボタン用のタイプ設定
          homeBtn.id = 'homeBtn';                                                                    //リロードボタン用のID設定
          homeBtn.value = 'ホームに戻る';                                                            //リロードボタン用の値設定
          document.body.appendChild(homeBtn);                                                        //リロードボタン出力
          document.getElementById('homeBtn').addEventListener('click', () => {                       //リロードボタン押下時処理
            window.location.reload();                                                                 //リロード処理実行
          });
        }
      });
    }
  }
/*
  shuffle(arr) {
    for (let j = arr.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [arr[k], arr[j] = arr[j], arr[k]];
    }
    return arr;
  }
*/
});
