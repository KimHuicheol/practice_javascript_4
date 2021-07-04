'use strict';
let correctAnswerCount = 0;                                                                             //正解解答数格納用の変数宣言
class Quiz {                                                                                            //Quizクラス定義
  constructor(category, difficulty, question, answerA, answerB, answerC, answerD) {                      //コンストラクター定義
    this.category = category;                                                                            //カテゴリプロパティ
    this.difficulty = difficulty;                                                                        //難易度プロパティ
    this.question = question;                                                                            //問題文プロパティ
    this.answerA = answerA;                                                                              //解答選択肢-1プロパティ
    this.answerB = answerB;                                                                              //解答選択肢-2プロパティ
    this.answerC = answerC;                                                                              //解答選択肢-3プロパティ
    this.answerD = answerD;                                                                              //解答選択肢-4プロパティ
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
    answerBtnA.value = this.answerA;                                                                      //解答選択肢-1出力用要素の値代入
    answerBtnB.value = this.answerB;                                                                      //解答選択肢-2出力用要素の値代入
    answerBtnC.value = this.answerC;                                                                      //解答選択肢-3出力用要素の値代入
    answerBtnD.value = this.answerD;                                                                      //解答選択肢-4出力用要素の値代入

    title.after(categoryNode);                                                                            //各要素の出力
    category.after(difficultyNode);
    document.body.appendChild(answerBtnA);
    document.body.appendChild(answerBtnB);
    document.body.appendChild(answerBtnC);
    document.body.appendChild(answerBtnD);

    btnA.addEventListener('click', () => {                                                                //正解解答選択肢押下時処理
      correctAnswerCount++;                                                                                //正解回答数インクリメント
    });
  }
}
window.addEventListener('load', () => {                                                                  //画面ロード後の処理
  const startQuiz = document.getElementById('start-quiz');                                                //開始ボタンノード取得
  const title = document.getElementById('title');                                                         //タイトルノード取得
  const operation = document.getElementById('operation');                                                 //問題文出力用ノード取得
  let count = 0;                                                                                          //取得クイズカウント用変数宣言
  let questionNumber = 1;                                                                                 //クイズNo.格納用変数宣言
  startQuiz.addEventListener('click', main);                                                              //開始ボタン押下時処理

  function main() {                                                                                       //メイン関数実行
    const promise =                                                                                        //非同期処理実行
      new Promise((resolve, reject) => {                                                                    //待機処理
        title.textContent = '取得中';                                                                        //タイトルノード文字列修正
        operation.textContent = '少々お待ちください';                                                        //質問文出力用ノード文字列修正
        startQuiz.remove();                                                                                  //開始ボタン削除
        setTimeout(resolve, 3000);                                                                           //タイマー関数-3000ms後、満足処理実行
      })
      .then(() => {                                                                                         //満足処理
        sendApiRequest();                                                                                    //APIリクエスト送信関数実行
      })
      .catch(() => {                                                                                        //拒絶処理
        console.log('rejectされました');
      })
  }

  function sendApiRequest() {                                                                             //APIリクエスト送信関数実行  
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')                                           //リクエスト送信
      .then(response => {                                                                                   //レスポンスオブジェクト取得
        if(!response.ok) {                                                                                   //レスポンスオブジェクト取得異常終了時処理
          console.error('エラーレスポンス', response);
        }
        else {                                                                                               //レスポンスオブジェクト取得正常終了時処理
          return response.json().then(quizList => {                                                           //JSON抽出-クイズ一覧取得

            const quizzes = [];                                                                                //クイズ一覧格納用の配列宣言
            for(let i = 0; i < 10; i++){                                                                       //インスタンス生成したクイズ一覧を配列に格納
              quizzes.push(
                new Quiz(
                quizList.results[i].category,
                quizList.results[i].difficulty,
                quizList.results[i].question,
                quizList.results[i].correct_answer,
                quizList.results[i].incorrect_answers[0],
                quizList.results[i].incorrect_answers[1],
                quizList.results[i].incorrect_answers[2]
                )
              )
            }
            quizzes[0].outDisplay();                                                                          //クイズ画面出力メソッド実行
            title.textContent = `問題${questionNumber}`;                                                      //タイトルノード編集
            selectAnswer();                                                                                   //解答関数実行
            
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

                  if(count < 10) {                                                                             //クイズ一覧存在時処理
                    title.textContent = `問題${questionNumber}`;                                                //タイトル列編集
                    quizzes[count].outDisplay();                                                                //クイズ画面出力メソッド実行
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
          });
        }
      })
      .catch(error => {                                                                                    //リクエスト送信異常終了時処理
        console.log(error);
      });
  }
});
