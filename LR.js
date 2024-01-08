let username, group; // змінні для запису даних з форми
document.getElementById(`name`).addEventListener(`input`, function(){
    username = this.value;
})
document.getElementById(`group`).addEventListener(`input`, function(){
    group = this.value;
})


function applyCode(){ // Функція для виводу результату коду з завдання
    var userCode = document.getElementById("codeInput").value;
    document.getElementById("codeOutput").innerHTML = userCode;
}

function shuffleAnswers(){ // Функція для перемішування варіантів відповіді при перезавантаженні сторінки
    document.querySelectorAll('#testContainer ul').forEach(function(ul){
        if(!ul.classList.contains('no-shuffle')){ // перевірка чи має список клас no-shuffle(клас, який виключає перемішування)
            for(let i = ul.children.length; i >= 0; i--){
                ul.appendChild(ul.children[Math.random() * i | 0]);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', shuffleAnswers);

     // Завдання Drag&drop
document.addEventListener('DOMContentLoaded', function(){
    var draggedElement = null; // змінна для зберігання перетягуваного елемента
      
document.addEventListener('dragstart', function(event){
    event.target.style.opacity = "0.4";
    draggedElement = event.target; // Запам'ятовуємо перетягуваний елемент
});

document.addEventListener('dragover', function(event){
    event.preventDefault(); // Скасовуємо стандартну поведінку для події dragover
});

document.addEventListener("dragend", function(event){
    event.target.style.opacity = "1";
})
      
document.addEventListener('drop', function(event){
    event.preventDefault(); // Скасовуємо стандартну поведінку для події drop
    var overElement = event.target.closest('#draggable_list li'); // Знаходимо елемент, над яким відпустили елемент
    if(overElement){
        var tempContent = overElement.innerHTML; // Зберігаємо вміст елемента, над яким відпустили елемент
        var tempId = overElement.id;
        overElement.innerHTML = draggedElement.innerHTML; // міняємо місцями елементи
        overElement.id = draggedElement.id;
        draggedElement.innerHTML = tempContent;
        draggedElement.id = tempId;
        draggedElement = null; // Обнуляємо змінну перетягуваного елемента
    }
});
});

    ////// Перевірка відповідей//////
// Функція для перевірки завдань з однією відповіддю
function check_radio(questionId, correctAnswer){
    var selectedOption = document.querySelector('input[name="' + questionId + '"]:checked');
    if(selectedOption && selectedOption.value === correctAnswer){
        return 1;
    }
    else 
    return 0;
}
// Функція для перевірки завдань декількома відповідями
function check_checkbox(questionId, correctAnswer){
    var selectedOptions = document.querySelectorAll('input[name="' + questionId + '"]:checked');
    var selectedValues = Array.from(selectedOptions).map(function(option){ // Перетворюємо вибрані елементи в масив значень
        return option.value;});
        var isCorrect = correctAnswer.length === selectedValues.length;
        for (var i = 0; i < correctAnswer.length; i++){
            if(!selectedValues.includes(correctAnswer[i])){ // якщо хоч одна відповідь не співпадає, відповідь не вірна 
                isCorrect = false;
                break;
            }
        }
        if(isCorrect){
            return 1;
        }
        else 
        return 0;
    }
    // Функція для перевірки завдання з випадаючим списком
function checkDropList(questionId, correctAnswer){
    var selectedOption = document.getElementById(questionId).value;
    if(selectedOption === correctAnswer){
        return 1;
    }
    else
    return 0;
}
// Функція для перевірки завдання Drag&Drop
function checkDragAndDropQuestion(correctOrder){
    var listItems = document.querySelectorAll('#draggable_list li'); // отримуємо всі перетягувані елементи
    for(var i = 0; i < listItems.length; i++){
        if(listItems[i].id !== correctOrder[i]){ // якщо ID елемента не у правильному порядку завдання не зараховане
            return 0;
        }
    }
    return 1;
}
    // Функція для перевірки завдання на впорядкування
function checkOrderQuestion(correctOrder){
    for(var i = 0; i < correctOrder.length; i++){
        var selectElement = document.getElementById('item' + (i + 1) + 'Order');
        if(!selectElement || selectElement.value !== correctOrder[i]){
            return 0;
        }
    }
    return 1;
}
function checkUserCode(userCode){
    var codeWithoutSpaces = userCode.replace(/\s+/g, ''); // Прибираємо пробіли з коду, щоб вони не сприймались як помилка
    var containerCheck = /<divclass="container">/.test(codeWithoutSpaces);  // перевірка чи є в коді блок з класом "container"
    var boxesCheck = (codeWithoutSpaces.match(/<divclass="box">/g) || []).length === 3; //перевірка на кількість блоків "box"
    var gridCheck = /display:grid;/.test(codeWithoutSpaces) && /grid-template-columns:repeat\(3,1fr\);/.test(codeWithoutSpaces); // перевірка чи виконується умова відображення
    var gapCheck = /gap:10px;/.test(codeWithoutSpaces);
    var boxStyleCheck = /background-color:red;/.test(codeWithoutSpaces) && /padding:20px;/.test(codeWithoutSpaces) && /text-align:center;/.test(codeWithoutSpaces); // перевірка чи виконується умова для стилів
      // Перевірка, чи всі умови виконані
      if(containerCheck && boxesCheck && gridCheck && gapCheck && boxStyleCheck){
        return 1; // Всі перевірки пройдено
    }
    else 
    return 0; // Код не пройшов одну або декілька перевірок
}
      

function checkAnswers(){
    var score = 0;
    score += check_radio(`question1`, `Варіант відповіді2`);
    score += check_radio(`question6`, `Варіант відповіді1`);
    score += check_radio(`question8`, `Варіант відповіді3`);
    score += check_checkbox('question2', ['Варіант відповіді1', 'Варіант відповіді2']);
    score += check_checkbox('question7', ['Варіант відповіді1', 'Варіант відповіді3']);
    score += check_checkbox('question9', ['Варіант відповіді2', 'Варіант відповіді3']);
    score += checkDropList(`question3`, `Варіант відповіді2`);
    score += checkDragAndDropQuestion([`dragtarget1`, `dragtarget2`, `dragtarget3`, `dragtarget4`]);
    score += checkOrderQuestion(`2`,`1`,`3`,`5`,`4`);
    score += checkUserCode(document.getElementById("codeInput").value);
    //alert('Ваш результат: ' + score);
    return score;
}

  // Завданя по об'єктам 
  // створення об'єкту "користувач" 2.3.1
var user = {
    name: ``,
    surname: ``
};
user.name = `John`;
user.surname = `Travolta`;
console.log('Ім`я:', user.name,'Прізвище:', user.surname);

// конструктор для об'єктів "Студент" 2.3.2
function Student(){
    this.specialty = ``;
    this.group = ``;
}
// метод для додавання даних студента
Student.prototype.addData = function(newSpecialty, newGroup){
    this.specialty = newSpecialty;
    this.group = newGroup;
};
// метод для зміни даних студента
Student.prototype.changeData = function(changeSpecialty, changeGroup){
    if(changeSpecialty !== this.specialty){
        this.specialty = changeSpecialty;
        console.log(`Спеціальність змінено на: ${changeSpecialty}`)
    }
    else{
        console.log(`Нова спеціальність співпадає зі старою`)
    }
    if(changeGroup !== this.group){
        this.group = changeGroup;
        console.log(`Групу змінено на: ${changeGroup}`)
    }
    else{
        console.log(`Нова Група співпадає зі старою`)
    }
}
// метод для видалення даних студента
Student.prototype.deleteData = function(){
    this.specialty = `__`;
    this.group = `__`;
    console.log(`Дані видалено`)
}

Student.prototype.displayData = function(){
    console.log(`Спеціальність: ${this.specialty}\t Група: ${this.group}`);
}
    
   
// конструктор успішності, який наслідується від "Student" 2.3.5
function Progress(){
    Student.call(this); // Виклик консруктора батьківського класу
    this.scores = [];
    this.test = ``;
    this.attempt = ``;
}

Progress.prototype = Object.create(Student.prototype);
Progress.prototype.constructor = Progress;
Progress.prototype.addData = function(newSpecialty, newGroup, newTest, newAttempt){
        
Student.prototype.addData.call(this, newSpecialty, newGroup);
this.test = newTest;
this.attempt = newAttempt;
};

Progress.prototype.addScore = function(score){
    this.scores.push(score);
};    

// розрахунок середнього балу
Progress.prototype.calcAverageScore = function(){
    var sum = 0;
    if(this.scores.length > 0){
        for (var i = 0; i < this.scores.length; i++){
            sum += this.scores[i];
        }
        this.averageScore = sum / this.scores.length;
    }
    else{
        console.log(`Бали відсутні`)
    }
};

Progress.prototype.displayData = function(){
    this.calcAverageScore();
    Student.prototype.displayData.call(this);
    if(this.averageScore !== null)
    console.log(`Тест: ${this.test}, Спроба: ${this.attempt}, Бал: ${this.averageScore}`);
};

//функція для копіювання об'єктів 2.3.3
function copyObj(obj){
    var copy = Object.create(Object.getPrototypeOf(obj));
    for(let key in obj)
    copy[key] = obj[key];
    console.log(`Об'єкт скопійовано`);
    return copy;
} 

// Завдання 2.3.6
//клас для представлення студента 
class StudentClass{
    constructor(name, specialty, group){
        this.name = name;
        this.specialty = specialty;
        this.group = group;
    }
    get AllProperties(){ // гетер, який повертає об'єднані властивості студента
        return `Ім'я: ${this.name}, Спеціальність: ${this.specialty}, Група: ${this.group}`
    }
    dataDisplay(){    // Метод для виведення даних в консоль
        console.log(this.AllProperties);
    };
}

// клас для представлення успішності студента
class ProgressClass extends StudentClass{
    constructor(name, specialty, group){ 
        super(name, specialty, group); //виклик конструктора батьківського класу
        this.scores = [];
        this.test = `ЛР JS2023`;
    }
    get attempt(){
        return this._attempt;
    }
    set attempt(value){
        if(value > 0){
            this._attempt = value;
        }
        else
        console.error('Значення має бути більше 0');
    }
    // метод для додавання оцінки до масиву
    addScore(score){
        this.scores.push(score);
        this.calcAverageScore();
    };
    // метод для обчислення середнього балу
    calcAverageScore(){
        let sum = 0;
        for (let i = 0; i < this.scores.length; i++){
            sum += this.scores[i];
        }
        this._averageScore = sum / this.scores.length;
    }
    get averageScore(){
        if(this.scores.length !== 0){   
            return this._averageScore;
        }
        else
        return `Бали відсутні`;
    };
    dataDisplay(){
        super.dataDisplay(); // виклик методу для виводу даних з батьківського класу
        console.log(`Тест: ${this.test}, Спроба: ${this._attempt}, Бал: ${this._averageScore}`);
    };
}

// Створення об'єктів та перевірка роботи методів у консолі
const student1 = new Student();
student1.addData(`Комп.науки`,`ТР-з21`);
student1.displayData();
student1.changeData(`Науки`,`ТР-21`);
student1.displayData();
student1.deleteData();
student1.displayData();
/**********************************************************/
const studentcopy = copyObj(student1);
studentcopy.displayData();
studentcopy.changeData(`Фізика`,`Тк-32`)
studentcopy.displayData();
/**********************************************************/
const progress1 = new Progress();
progress1.addData(`Хімія`, 'ТІ-44',`TEST`, 2);
progress1.addScore(10);
progress1.addScore(4);
progress1.displayData();
/**********************************************************/
const student2 = new StudentClass(`Ім'я`, 'Маш.буд', 'РП-53');
student2.dataDisplay();
/**********************************************************/
const progress2 = new ProgressClass(`Ім'я`,`Механіка`, 'Тф-12');
progress2.attempt = 3;
progress2.addScore(10);
progress2.addScore(5);
progress2.addScore(6);
progress2.dataDisplay();
/************************************************************/
document.getElementById(`finishTestBtn`).addEventListener(`click`, function(event){ // зчитуюємо подію натискання кнопки "Завершити тест"
    if(!username || !group){ // якщо поля не заповнені виводимо повідомлення
        alert(`Заповніть форму на початку тесту`)
        event.preventDefault();
    }
    else{
        const Userinfo = new ProgressClass(username, `Комп'ютерні науки`, group);  // створюємо екземпляр об'єкта та записуємо дані
        Userinfo.addScore(checkAnswers())
        alert(checkAnswers());
        // Відправляємо результати на сервер за допомогою fetch
        fetch('/test', { 
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Userinfo), // Додаємо результат до об'єкта, який надсилаємо
        });
    }
})
