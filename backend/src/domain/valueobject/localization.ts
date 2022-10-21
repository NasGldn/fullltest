import { ValueObject, ValueObjectProps} from "./valueobject";

interface LocalizationProps extends ValueObjectProps {
    _latitude: number;
    _longitude: number;
}

export default class Localization extends ValueObject<LocalizationProps> {

  constructor(props: LocalizationProps) {
    super(props);
    this.validate();
  }
  get latitude(): number {
    return this.props._latitude;
  }

  get longitude(): number {
    return this.props._longitude;
  }
  validate() {
    if (this.props._latitude>90 || this.props._latitude<-90 || this.props._longitude <-180 || this.props._longitude >180) {
      throw new Error("Latitude OR Longitude are not valid");
    }
    // other validations...
  }

}