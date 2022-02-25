function LimitText(data,limited) {
     data = data.split(' ');
     if(data.length >= limited){
          data.length = limited
          data.push('...')
     }
     return data.join(' ')
}

export default LimitText