import { defineNuxtPlugin } from '#app';
import {format, formatDistance, setDefaultOptions} from "date-fns";
import {ko} from "date-fns/locale";

export default defineNuxtPlugin(nuxtApp => {
  setDefaultOptions({
    locale: ko,
  });

  nuxtApp.provide('formatDate',(rawTime: Date | string, locale = ko)=>{
    const date = new Date(rawTime);
    const now = new Date();

    const diffInSec = (now.getTime() - date.getTime()) / 1000;
    const diffInMin = Math.floor(diffInSec / 60);

    if(diffInSec < 30){
      return '방금 전';
    }

    if(diffInMin < 59){
      formatDistance(date, now, { addSuffix: true, locale });
    }

    return format(date, 'PPP p', { locale });
  });
});
