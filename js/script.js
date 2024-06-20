//FORMULAS NUTRICIONALES
document.getElementById('calculateBtn').addEventListener('click', function () {
    const age = parseInt(document.getElementById('age').value);
    const height = parseFloat(document.getElementById('height').value) / 100;
    const weight = parseFloat(document.getElementById('weight').value);
    const waist = parseFloat(document.getElementById('waist').value);
    // const calf = parseFloat(document.getElementById('calf').value);
    const sex = document.getElementById('sex').value;
    const formula = document.getElementById('formula').value;
    const bmrFormula = document.getElementById('bmrFormula').value;
    const activity = parseFloat(document.getElementById('activity').value);
    const tea = parseFloat(document.getElementById('tea').value) / 100;
    const calorieAdjust = parseFloat(document.getElementById('calorieAdjust').value);

    //CÁLCULOS NUTRICIONALES
    if (age && height && weight && waist && tea  /*&& calf*/) {

        //Calculo de IMC
        const bmi = (weight / (height * height)).toFixed(2);
        document.getElementById('bmiResult').innerText = ` ${bmi}`; //Texto a mostrar = `IMC: ${bmi}`;
        //Clasificacion IMC
        let clasificationBMI;
        if (bmi < 18.5) {
            clasificationBMI = 'Bajo Peso';
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            clasificationBMI = 'Peso Normal';
        } else if (bmi >= 25 && bmi <= 29.9) {
            clasificationBMI = 'Sobrepeso';
        } else if (bmi >= 30 && bmi <= 34.9) {
            clasificationBMI = 'Obesidad Tipo 1';
        } else if (bmi >= 35 && bmi <= 39.9) {
            clasificationBMI = 'Obesidad Tipo 2';
        } else if (bmi >= 40) {
            clasificationBMI = 'Obesidad Tipo 3';
        }
        document.getElementById('clasiBmiResult').innerText = `${clasificationBMI}`; //= `Peso Ideal: ${idealWeight.toFixed(2)} kg`;

        //peso ideal
        let idealWeight;
        switch (formula) {
            case 'broca':
                idealWeight = height * 100 - 100;
                break;
            case 'lorentz':
                idealWeight = height * 100 - 100 - ((height * 100 - 150) / (sex === 'male' ? 4 : 2.5));
                break;
            case 'miller':
                idealWeight = 56.2 + 1.41 * ((height * 100 / 2.54) - 60);
                break;
            case 'hamwi':
                idealWeight = 48.0 + 2.7 * ((height * 100 / 2.54) - 60);
                break;
        }
        document.getElementById('idealWeightResult').innerText = `${idealWeight.toFixed(2)} kg`; //= `Peso Ideal: ${idealWeight.toFixed(2)} kg`;

        //Porcentaje de grasa
        const sexValue = (sex === 'male') ? 0 : 1; //constante valor de sexo
        const fatPercentage =  -44.988 + (0.503 * age) + (10.689 * sexValue) + (3.172 * bmi) 
                                - (0.026 * (bmi * bmi)) + (0.181 * bmi * sexValue) 
                                - (0.02*bmi * age) - (0.005*(bmi * bmi) * sexValue) 
                                + (0.00021 * (bmi*bmi) * age) ;
                                                    
        document.getElementById('fatPercentageResult').innerText = `${fatPercentage.toFixed(2)}%`; //`Porcentaje de Grasa: ${fatPercentage.toFixed(2)}%`

        //CLASIFICACION PORCENTAJE DE GRASA

        //clasificacion masculino
        const RANGOS_HOMBRE = {
            '20-39': { bajo: 8, normalBajo: 8, normalAlto: 20, sobrepesoBajo: 20, sobrepesoAlto: 25 },
            '40-59': { bajo: 11, normalBajo: 11, normalAlto: 22, sobrepesoBajo: 22, sobrepesoAlto: 28 },
            '60-79': { bajo: 13, normalBajo: 13, normalAlto: 25, sobrepesoBajo: 25, sobrepesoAlto: 30 }
        };
        const RANGOS_MUJER = {
            '20-39': { bajo: 21, normalBajo: 21, normalAlto: 33, sobrepesoBajo: 33, sobrepesoAlto: 39 },
            '40-59': { bajo: 23, normalBajo: 23, normalAlto: 35, sobrepesoBajo: 35, sobrepesoAlto: 40 },
            '60-79': { bajo: 24, normalBajo: 24, normalAlto: 36, sobrepesoBajo: 36, sobrepesoAlto: 42 }
        };
        
        let clasificaciónFat = '';
        let rangos = sex === 'male' ? RANGOS_HOMBRE : (sex === 'female' ? RANGOS_MUJER : null);

        if (rangos) {
            let rango;
            if (age >= 20 && age <= 39) rango = '20-39';
            else if (age >= 40 && age <= 59) rango = '40-59';
            else if (age >= 60 && age <= 79) rango = '60-79';
        
            if (rango) {
                const { bajo, normalBajo, normalAlto, sobrepesoBajo, sobrepesoAlto } = rangos[rango];
                if (fatPercentage < bajo) clasificaciónFat = 'Bajo en grasa';
                else if (fatPercentage >= normalBajo && fatPercentage <= normalAlto) clasificaciónFat = 'Normal';
                else if (fatPercentage > sobrepesoBajo && fatPercentage <= sobrepesoAlto) clasificaciónFat = 'Sobrepeso';
                else clasificaciónFat = 'Obesidad';
            } else clasificaciónFat = 'Clasificación no definida';
        } //else clasificaciónFat = 'Clasificación no definida';

        document.getElementById('fatPercentageClassiResult').innerText = `${clasificaciónFat}`;
        
        //circunferencia de cintura
        let clasificaciónWaist = '';
        if (sex === 'male') {
            if (waist < 94) {
                clasificaciónWaist = 'Bajo riesgo';
            } else if (waist >= 94 && waist <= 102) {
                clasificaciónWaist = 'Riesgo elevado';
            } else if (waist > 102) {
                clasificaciónWaist = 'Riesgo muy elevado';
            }
        } else if (sex === 'female') {
            if (waist < 80) {
                clasificaciónWaist = 'Normal';
            } else if (waist >= 80 && waist <= 88) {
                clasificaciónWaist = 'Riesgo elevado';
            } else if (waist > 88) {
                clasificaciónWaist = 'Riesgo muy elevado';
            }
        }
        document.getElementById('waistResultado').innerText = clasificaciónWaist; // = 'Riesgo Cardiovascular: ' + clasificaciónWaist

        // Tasa metabólica basal
        let bmr;
        if (bmrFormula === 'harris-benedict') {
            bmr = (sex === 'male' ? 66.473 + (13.751 * weight) + (5 * (height * 100)) - (6.7550 * age)
                : 655.1 + (9.463 * weight) + (1.8 * (height * 100)) - (4.6756 * age));
        } else if (bmrFormula === 'mifflin-st-jeor') {
            bmr = (sex === 'male' ? 5 : -161) + (10 * weight) + (6.25 * (height * 100)) - (5 * age);
        } else if (bmrFormula === 'katch-mcardle') {
            bmr = 370 + (21.6 * (weight * (1 - fatPercentage / 100)));
        }
        document.getElementById('bmrResult').innerText = `${bmr.toFixed(2)} kcal`; //= `Tasa Metabólica Basal: ${bmr.toFixed(2)} kcal`;

        //ingesta total
        const totalCaloricIntake = (bmr * activity) + calorieAdjust + (bmr * tea);
        document.getElementById('totalCaloricIntakeResult').innerText = `${totalCaloricIntake.toFixed(2)} kcal`; //= `Ingesta Calórica Total: ${totalCaloricIntake.toFixed(2)} kcal`;
    } else {
        alert('Por favor, ingresa valores válidos para todos los campos.');
    }

    

});//FIN DE FORMULAS NUTRICIONALES

//validar efecto térmico -------------------
document.getElementById('tea').addEventListener('input', function (e) {
    var value = parseInt(e.target.value);
    var mensajeError = document.getElementById('mensajeError');
    if (value < 10) {
        mensajeError.style.display = 'block';
        e.target.value = '10'; // Limpiar el campo
    } else {
        mensajeError.style.display = 'none';
    }
});

//BOTÓN UP ---------------
// Mostrar botón para subir al inicio de la pagina
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// Desplazamiento hacia arriba del botón
function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}





