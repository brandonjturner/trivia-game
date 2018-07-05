
$(document).ready(function () {
    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);
})
var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId: '',
    questions: {
        q1: 'The Sigerian Scammers are trying to get the secret formula to...?',
        q2: "What is Scary Terry's catchphrase?",
        q3: 'What is the name of the homeless man that Rick originally builds Anatomy Park in?',
        q4: "What is the name of Jerry's parents' lover?",
        q5: "How old is Rick Sanchez?",
        q6: "What is the name of Rick's wife, Beth's mom?",
        q7: "In season 3, what is the name Morty calls his sentient, muscle-memory arm?"
    },
    options: {
        q1: ['Plutonium', 'Concentrated Dark Matter', 'Gasoline', 'Coaxium'],
        q2: ['DIE', 'GOTCHA', 'BITCH', 'SCARY TERRRRRY'],
        q3: ['Bob', 'Alfred', 'Ruben', 'Harry'],
        q4: ['Winston', 'Bishop', 'Schmidt', 'Jacob'],
        q5: ['70', '65', '75', '80'],
        q6: ['Jessica', 'Diane', 'Michelle', 'Britney'],
        q7: ['Armothy', 'Armend', 'Harmand', 'Muscle Arm']
    },
    answers: {
        q1: 'Concentrated Dark Matter',
        q2: 'BITCH',
        q3: 'Ruben',
        q4: 'Jacob',
        q5: '70',
        q6: 'Diane',
        q7: 'Armothy'
    },
    startGame: function () {
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);
        $('#game').show();
        $('#results').html('');
        $('#timer').text(trivia.timer);
        $('#start').hide();
        $('#remaining-time').show();
        trivia.nextQuestion();
    },
    nextQuestion: function () {
        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);
        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }
        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);
        var questionOptions = Object.values(trivia.options)[trivia.currentSet];
        $.each(questionOptions, function (index, key) {
            $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
        })
    },
    timerRunning: function () {
        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if (trivia.timer === 4) {
                $('#timer').addClass('last-seconds');
            }
        }
        else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        }
        else if (trivia.currentSet === Object.keys(trivia.questions).length) {
            $('#results')
                .html('<h3>Thank you for playing!</h3>' +
                    '<p>Correct: ' + trivia.correct + '</p>' +
                    '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                    '<p>Unaswered: ' + trivia.unanswered + '</p>' +
                    '<p>Please play again!</p>');
            $('#game').hide();
            $('#start').show();
        }
    },
    guessChecker: function () {
        var resultId;
        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
        if ($(this).text() === currentAnswer) {
            $(this).addClass('btn-success').removeClass('btn-info');
            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Correct Answer!</h3>');
        }
        else {
            $(this).addClass('btn-danger').removeClass('btn-info');
            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Better luck next time! ' + currentAnswer + '</h3>');
        }
    },
    guessResult: function () {
        trivia.currentSet++;
        $('.option').remove();
        $('#results h3').remove();
        trivia.nextQuestion();
    }
}