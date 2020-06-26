export enum FormName {
  Travel,
  Errands,
  Delivery,
  InHome,
  Assistant,
}

export enum ServiceStatus {
  Completed,
  OnGoing,
}
export type TravelFormType = {
  inputTime: string;
  inputPickupAddress: string;
  inputTripType: string;
  inputDropAddress: string;
  inputTravelReason: string;
  inputHealthCondition: string;
};

export type FamilyMemberFormType = {
  inputParentName: string;
  inputRelation: string;
  inputNumber: string;
};

export type UserFormType = {
  inputName: string;
  inputEmail: string;
  userNumber?: string;
};

export type ErrandsFormType = {
  inputTime: string;
  inputAddress: string;
  inputRequirement: string;
  inputJoin: string;
};

export type DeliveryFormType = {
  inputTime: string;
  inputPickupAddress: string;
  inputDropAddress: string;
  inputItems: string;
};

export type AssistantFormType = {
  inputTask: string;
  formName?: string;
};

export class UserForm implements UserFormType {
  constructor(addFieldNames = false) {
    if (addFieldNames) {
      this.inputName = "inputName";
      this.inputEmail = "inputEmail";
      this.userNumber = "userNumber";
    }
  }
  inputName = "";
  inputEmail = "";
  userNumber? = "";
}

export class FamilyMemberForm implements FamilyMemberFormType {
  constructor(addFieldNames = false) {
    if (addFieldNames) {
      this.inputNumber = "inputNumber";
      this.inputParentName = "inputParentName";
      this.inputRelation = "inputRelation";
    }
  }
  inputParentName = "";
  inputRelation = "";
  inputNumber = "";
}

export class AssistantForm implements AssistantFormType {
  constructor(addFieldNames = false) {
    if (addFieldNames) {
      this.inputTask = "inputTask";
    }
  }
  inputTask = "";
  formName? = "";
}

export class DeliveryForm implements DeliveryFormType {
  constructor(addFieldNames = false) {
    if (addFieldNames) {
      this.inputTime = "inputTime";
      this.inputPickupAddress = "inputPickupAddress";
      this.inputDropAddress = "inputDropAddress";
      this.inputItems = "inputItems";
    }
  }

  inputTime = "";
  inputPickupAddress = "";
  inputDropAddress = "";
  inputItems = "";
  formName? = "";
}
export class ErrandsForm implements ErrandsFormType {
  constructor(addFieldNames = false) {
    if (addFieldNames) {
      this.inputJoin = "inputJoin";
      this.inputRequirement = "inputRequirement";
      this.inputTime = "inputTime";
      this.inputAddress = "inputAddress";
    }
  }
  inputAddress = "";
  formName = "";
  inputTime = "";
  inputRequirement = "";
  inputJoin = "";
}

export class TravelBookingForm
  implements UserFormType, FamilyMemberFormType, TravelFormType {
  inputTime = "";
  inputPickupAddress = "";
  inputTripType = "";
  inputDropAddress = "";
  inputTravelReason = "";
  inputHealthCondition = "";
  formName? = "";
  inputParentName = "";
  inputRelation = "";
  inputNumber = "";
  inputName = "";
  inputEmail = "";
  userNumber? = "";
}

export class ErrandsBookingForm
  implements UserFormType, FamilyMemberFormType, ErrandsFormType {
  inputAddress = "";
  inputRequirement = "";
  inputTime = "";
  inputJoin = "";
  formName? = "";
  inputParentName = "";
  inputRelation = "";
  inputNumber = "";
  inputName = "";
  inputEmail = "";
  userNumber? = "";
}

export class DeliveryBookingForm
  implements UserFormType, FamilyMemberFormType, DeliveryFormType {
  inputTime = "";
  inputPickupAddress = "";
  inputDropAddress = "";
  inputItems = "";
  formName? = "";
  inputParentName = "";
  inputRelation = "";
  inputNumber = "";
  inputName = "";
  inputEmail = "";
  userNumber? = "";
}

export type BookingFormType = {
  familyMember: FamilyMemberFormType;
  user: UserFormType;
  formName: FormName;
  formData: any;
};
export class BookingForm {
  formName: FormName | undefined;
  familyMember = new FamilyMemberForm();
  user = new UserForm();
  formData: any;
}

export class BookingForms<T> {
  constructor(TCreator: new () => T, form: FormName) {
    this.formData = new TCreator();
    this.formName = form;
  }
  formName: FormName;
  familyMember: FamilyMemberFormType = new FamilyMemberForm();
  user: UserFormType = new UserForm();
  formData: T;
}

export type InHomeFormType = {
  inputTime: string;
  inputAddress: string;
  inputServiceType: string;
  inputSpecialInstructions: string;
};

export class InHomeForm implements InHomeFormType {
  constructor(addFieldNames = false) {
    if (addFieldNames) {
      this.inputTime = "inputTime";
      this.inputAddress = "inputAddress";
      this.inputServiceType = "inputServiceType";
      this.inputSpecialInstructions = "inputSpecialInstructions";
    }
  }
  inputTime = "";
  inputAddress = "";
  inputServiceType = "";
  inputSpecialInstructions = "";
}

export type InHomeBookingFormType = {
  familyMember: FamilyMemberFormType;
  inHome: InHomeFormType;
  user: UserFormType;
  formName: FormName.InHome;
};
export class InHomeBookingForm implements InHomeBookingFormType {
  formName: FormName.InHome = FormName.InHome;
  familyMember: FamilyMemberFormType = new FamilyMemberForm();
  inHome: InHomeFormType = new InHomeForm();
  user: UserFormType = new UserForm();
}

export class AssistantBookingForm implements UserFormType, AssistantFormType {
  inputTask = "";
  formName? = "";
  inputName = "";
  inputEmail = "";
  userNumber? = "";
}

export type TravelBookingFormType = UserFormType &
  TravelFormType &
  FamilyMemberFormType;

export type ErrandsBookingFormType = UserFormType &
  FamilyMemberFormType &
  ErrandsFormType;

export type DeliveryBookingFormType = UserFormType &
  FamilyMemberFormType &
  DeliveryFormType;

export type AssistantBookingFormType = UserFormType & AssistantFormType;
