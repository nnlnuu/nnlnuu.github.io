document.addEventListener('DOMContentLoaded', function() {
    // Variables to store selected values
    let selectedModel = '';
    let selectedAttackType = '';

    let modelflag = false;
    let attackTypeFlag = false;

    let img_id_arr;
    let imagePaths=[];
    
    function set_imagePaths(selectedModel,selectedAttackType){
        
        if(selectedModel=='lenet'){
            if(selectedAttackType=='RA'){
                img_id_arr=[213,934,1022,1109,1127,1328,1379,1719,1844,2003];
            }else{
                img_id_arr=[213,1022,1109,1127,1328,2003,2646,2727,2945];
            }
            
        }else if(selectedModel=='resnet'){
            if(selectedAttackType=='RA'){
                img_id_arr=[226,785,817,1359,1698,2108,2246,2353,2488,3163];
            }else{
                img_id_arr=[226,817,2108,2246,3966,3972,4562,6095,6989,8444];
            }

        }else if(selectedModel=='net_in_net'){
            console.log("if문 selectedModel == ",selectedModel);
            if(selectedAttackType=='RA'){
                img_id_arr=[277,714,1628,1637,1922,1998,2143,2150,2156,2241];
            }else if(selectedAttackType=='SA'){
                img_id_arr=[241,277,1628,1998,2143,2526,3059,3623,3712];
            }else{//selectedAttackType=='DA'
                img_id_arr=[277,1628,1998,2143,2526,3059,3476,3712];
            }
            
        }else{//selectedModel=='wide_resnet'
    
        }
        
        imagePaths=[];
        console.log("Image ID Array:", img_id_arr);

        if (!img_id_arr || img_id_arr.length === 0) {
            console.error("img_id_arr is undefined or empty");
            return;
        }

        for (let i = 0; i < img_id_arr.length; i++) {
            imagePaths.push(`images/original_images/${img_id_arr[i]}_${selectedModel}_${selectedAttackType}.png`);
        }
        console.log(imagePaths);
    }
   

    // const imagePaths = [
    //     'images/original_images/213.png',
    //     'images/original_images/1022.png',
    //     'images/original_images/1109.png',
    // ];

    let selectedImage = '';
    let img_id;

    function addImages(selectedModel,selectedAttackType) {
        set_imagePaths(selectedModel,selectedAttackType);
        const imageContainer = document.querySelector('.image-container');
        imageContainer.innerHTML = ''; // Clear existing images
        imagePaths.forEach(path => {
            const img = document.createElement('img');
            img.src = path;
            img.alt = 'Image';
            img.addEventListener('click', function() {
                selectedImage = this.src;
                img_id = selectedImage.split('/').pop().split('.')[0].split('_')[0];//213
                console.log('Selected Image img_id:', img_id);
                alert(`Selected Image ID : ${img_id}`);
            });
            imageContainer.appendChild(img);
        });

    }



    document.getElementById('model-select').addEventListener('change', function() {
        selectedModel = this.value;
        console.log('Selected Model:', selectedModel);
        modelflag=true;
        if(modelflag&&attackTypeFlag){
            addImages(selectedModel, selectedAttackType);
        }
        
    
        
    });

    document.getElementById('attack-type-select').addEventListener('change', function() {
        selectedAttackType = this.value;
        console.log('Selected Attack Type:', selectedAttackType);
        attackTypeFlag=true;
        if(modelflag&&attackTypeFlag){
            addImages(selectedModel, selectedAttackType);
        }
        
        
    });

    document.getElementById('execute-button').addEventListener('click', function() {
        const selectedModel = document.getElementById('model-select').value;
        const selectedAttackType = document.getElementById('attack-type-select').value;
        
        // 선택된 값들과 이미지 경로를 progressbar.html 페이지로 전달
        window.location.href = `progressbar.html?model=${selectedModel}&attack=${selectedAttackType}&image=${img_id}`;
    });

    


});
