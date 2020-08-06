export function _resetForm(event, arr){
    for(let item of event.currentTarget){
        for(let name of arr){
            if(item.name === name){
                item.value = null;
            }
        }
    }
  }