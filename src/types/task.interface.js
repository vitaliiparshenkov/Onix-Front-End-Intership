export var StatusEnum;
(function (StatusEnum) {
    StatusEnum["Todo"] = "todo";
    StatusEnum["Inprogress"] = "inprogress";
    StatusEnum["Done"] = "done";
})(StatusEnum || (StatusEnum = {}));
export var StatusOperation;
(function (StatusOperation) {
    StatusOperation[StatusOperation["Add"] = 0] = "Add";
    StatusOperation[StatusOperation["Edit"] = 1] = "Edit";
    StatusOperation[StatusOperation["Cancel"] = 2] = "Cancel";
    StatusOperation[StatusOperation["Save"] = 3] = "Save";
})(StatusOperation || (StatusOperation = {}));
//# sourceMappingURL=task.interface.js.map