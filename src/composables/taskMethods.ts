import {StatusEnum} from '@/types/task.interface';

export default function taskMethods(elList: any): any {
  const goByElem = () => {
    for (let i = 0; i < elList.value.length; i++) {
      const el: HTMLElement = elList.value[i];
      // console.log(i + ' - ' +el);
      if (el) {
        setTimeout(() => {
          el.classList.add('scale');
        }, i * 200);
      }
    }
    setTimeout(removeClass, (elList.value.length - 1) * 500, 'scale');
  };
  const removeClass = (className: string) => {
    let el: HTMLElement;
    for (let i = 0; i < elList.value.length; i++) {
      el = elList.value[i];
      // console.log(i+i + ' - ' +el);
      if (el) {
        el.classList.remove(className);
      }
    }
  };
  const isTodoStatusDone = (status: StatusEnum) => {
    if (status === StatusEnum.Done) {
      return true;
    } else {
      return false;
    }
  };

  return {
    goByElem,
    removeClass,
    isTodoStatusDone,
  };
}
