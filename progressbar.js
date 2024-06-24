$(document).ready(function() {
    
    
    function updateProgressBar(duration, progressBar,AttackType,num) {
        var interval = 100; // 업데이트 간격 (100ms)
        var progressValue = 0;
        var increment = (interval / duration) * 100; // 각 업데이트마다 증가할 값
    
        var intervalId = setInterval(function() {
            progressValue += increment;
            if (progressValue >= 100) {
                progressValue = 100;
                clearInterval(intervalId);
            }
            progressBar.css("width", progressValue + "%");
        }, interval);
    
    }

    function extractDuration(img_id,selectedModel,AttackType,num){

        // File path to your CSV file
        const filePath = 'images/Attacked_datas/'+img_id+'_'+selectedModel+'_'+AttackType+'.csv';
        let infoArray=null;
        var duration;
        $.ajax({
            async: false,
            url:filePath,
            dataType:'text',
            success: function(data) {
                csvArray =data.split(',');

                // Get the last element of the array
                const lastElement = csvArray[csvArray.length - 1];
        
                console.log(lastElement); // Output: 6.325098037719727

                const number = parseFloat(lastElement); // Parse the string as a floating-point number
                const result = Math.floor(number * 1000); // Remove the decimal part and multiply by 100
                console.log(result); // Output: 3649
                duration=result;
                infoArray=csvArray;

                
            }
        });
        
        updateInfo(duration,img_id,selectedModel,AttackType,infoArray,num);
        return duration;

       
    }

    function updateInfo(duration,img_id,selectedModel,AttackType,csvArray,num){
        // 모델과 공격 유형 출력

        var attacked_img_src='images/Attacked_images/'+img_id+'_'+selectedModel+'_'+AttackType+'.png';
        console.log(attacked_img_src)
        
        $('#model-info'+num).text(`Selected Model: ${selectedModel}`);
        let AttackTypeDetail;
        if(AttackType=='SA'){
            AttackTypeDetail='Score Attack';
        }else if(AttackType=='SA'){
            AttackTypeDetail='Distance Attack';
        }else if(AttackType=='RA'){
            AttackTypeDetail='Rapid Attack';
        }else {
            AttackTypeDetail=AttackType;
        }
        $('#attack-info'+num).text(`Selected Attack Type: ${AttackTypeDetail}`);

        $('#confidence-score-info'+num).text(`Confidence Score: ${csvArray[0]}`);
        $('#distance-info'+num).text(`Distance: ${csvArray[1]}`);
        $('#origin-class-info'+num).text(`Origin Class: ${csvArray[2]}`);
        $('#predicted-class-info'+num).text(`Predicted Class: ${csvArray[3]}`);
        $('#time-info'+num).text(`Time: ${csvArray[4]}`);
    
        // 이미지 출력
        $('#image-info'+num).attr('src', attacked_img_src);
        console.log(`Image Path for progress bar ${num}: ${attacked_img_src}`);


    
        // progress bar 완료 후에 정보를 표시
        setTimeout(function() {
            $('#info-container'+num).css('display', 'block');
        }, duration);
    }

    // URL 파싱
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const selectedModel = urlParams.get('model');
    const selectedAttackType = urlParams.get('attack');
    const img_id = urlParams.get('image');
    

    let contrastAttackType='';
    if(selectedAttackType=='SA'){
        contrastAttackType='Su';
    }else if(selectedAttackType=='DA'){
        contrastAttackType='OPA2D';
    }else{//selectedAttackType='RA'
        contrastAttackType='none';
    }


    if(selectedAttackType=='SA'){
        var duration1=extractDuration(img_id,selectedModel,selectedAttackType,1);
        var duration2=extractDuration(img_id,selectedModel,contrastAttackType,2);
        
        var progressBar1 = $("#progressbar1");
        updateProgressBar(duration1, progressBar1,selectedAttackType,1);
    
        var progressBar2 = $("#progressbar2");
        updateProgressBar(duration2, progressBar2,contrastAttackType,2);
    }else if(selectedAttackType=='DA'){
        var duration1=extractDuration(img_id,selectedModel,selectedAttackType,1);
        var duration2=extractDuration(img_id,selectedModel,contrastAttackType,2);
        
        var progressBar1 = $("#progressbar1");
        updateProgressBar(duration1, progressBar1,selectedAttackType,1);
    
        var progressBar2 = $("#progressbar2");
        updateProgressBar(duration2, progressBar2,contrastAttackType,2);
    }else{
        var duration1=extractDuration(img_id,selectedModel,selectedAttackType,1);

        var progressBar1 = $("#progressbar1");
        
        updateProgressBar(duration1, progressBar1,selectedAttackType,1);

    }

});
