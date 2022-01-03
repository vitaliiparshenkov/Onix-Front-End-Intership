export default {
    methods: {
        getDateInStringFormat(d) {
            const month = d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (1 + d.getMonth());
            const day = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
            return month + '/' + day + '/' + d.getFullYear();
        },
    },
};
//# sourceMappingURL=dateInStringFormat.js.map