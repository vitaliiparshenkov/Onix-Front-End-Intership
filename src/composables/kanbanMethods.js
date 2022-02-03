import { StatusEnum } from '@/types/task.interface';
import getDateInStringFormat from '../composables/getDateInStringFormat';
export default function kanbanMethods(date, search, serchDateBoxHide, todoList) {
    const onSubmitSearch = () => {
        if (date.value.length != 0) {
            return todoList.value.filter((el) => el.name.toLowerCase().includes(search.value.toLowerCase()) &&
                new Date(el.completionDate) >= new Date(getDateInStringFormat(date.value[0])) &&
                new Date(el.completionDate) <= new Date(getDateInStringFormat(date.value[1])));
        }
        else {
            return todoList.value.filter((el) => el.name.toLowerCase().includes(search.value.toLowerCase()));
        }
    };
    const format = (date) => {
        const dayStart = date[0].getDate() < 10 ? '0' + date[0].getDate() : date[0].getDate();
        const monthStart = date[0].getMonth() + 1 < 10 ? '0' + (date[0].getMonth() + 1) : date[0].getMonth() + 1;
        const yearStart = date[0].getFullYear();
        const dayEnd = date[1].getDate() < 10 ? '0' + date[1].getDate() : date[1].getDate();
        const monthEnd = date[1].getMonth() + 1 < 10 ? '0' + (date[1].getMonth() + 1) : date[1].getMonth() + 1;
        const yearEnd = date[1].getFullYear();
        return `${monthStart}/${dayStart}/${yearStart} - ${monthEnd}/${dayEnd}/${yearEnd}`;
    };
    const showDateString = () => {
        serchDateBoxHide.value = !serchDateBoxHide.value;
        if (serchDateBoxHide.value === true) {
            date.value = [];
        }
    };
    const onClearInputSearch = () => {
        search.value = '';
    };
    const getClassDependentOn = (status) => {
        switch (status) {
            case StatusEnum.Todo:
                return 'to-do';
            case StatusEnum.Inprogress:
                return 'in-progress';
            case StatusEnum.Done:
                return 'do-ne';
        }
    };
    const getClassStatus = (date_) => {
        const currentDate = Date.now();
        const completionDate = new Date(date_);
        if (currentDate > completionDate.getTime()) {
            return 'fa-hourglass-end';
        }
        else {
            if (completionDate.getTime() - currentDate <= 86400000) {
                return 'fa-calendar-day';
            }
            else {
                return 'fa-calendar-alt';
            }
        }
    };
    const getTodoType = (status) => {
        return onSubmitSearch().filter((el) => el.status === status);
    };
    const getCountTodoStatus = (status) => {
        return todoList.value.filter((el) => el.status === status).length;
    };
    return {
        onSubmitSearch,
        format,
        showDateString,
        onClearInputSearch,
        getClassDependentOn,
        getClassStatus,
        getTodoType,
        getCountTodoStatus,
    };
}
//# sourceMappingURL=kanbanMethods.js.map