import SignaturePad, { IOptions } from 'signature_pad';

export interface IOptionsReforged extends IOptions {
  enableTouchpad?: boolean;
}

/**
 * @summary SignaturePad with touchpad support.
 * @description Extends SignaturePad canvas signing with the support to take input directly from a touchpad.
 * The least supported device to sign on is a laptop without a touch screen.
 * This will let a user sign with direct movement on a touchpad, I hope.
 */
export class SignaturePadReforged extends SignaturePad {
  private enableTouchpad: boolean = false;
  constructor(canvas: HTMLCanvasElement, { enableTouchpad = false, ...options }: IOptionsReforged = {}) {
    super(canvas, options);
    this.setTouchpadState(enableTouchpad);
  }

  public setTouchpadState(state: typeof SignaturePadReforged.prototype.enableTouchpad) {
    this.enableTouchpad = state;
    if (state) {
      this.observeTouchpad();
    } else {
      this.unobserveTouchpad();
    }
  }
  private handleTouchPadMove = () => {
    console.log('move');
  };

  private observeTouchpad() {
    window.addEventListener('wheel', this.handleTouchPadMove);
  }

  private unobserveTouchpad() {
    window.removeEventListener('wheel', this.handleTouchPadMove);
  }
}
