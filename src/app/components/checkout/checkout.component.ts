import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Checkbox } from 'primeng/checkbox';
import { ShopFormService } from '../../services/shop-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { ShopValidators } from '../../validators/shop-validators';
import { CartService } from '../../services/cart.service';



interface City {
    name: string;
    code: string;
}


interface CardType {
  name: string
}

@Component({
  selector: 'app-checkout',
  imports: [
    ReactiveFormsModule,
    InputGroup,
    InputGroupAddonModule,
    InputTextModule,
    Select,
    FormsModule,
    Checkbox,
    CommonModule,
    MessageModule
],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {



cities: City[] | undefined;

cardType: CardType[] | undefined

selectedCity: City | undefined;
value1: Date | undefined;


// seperator



  fb = inject(FormBuilder);
  cartService = inject(CartService)
  formService = inject(ShopFormService)

  checkoutFormGroup!: FormGroup

  totalPrice: number = 0
  totalQuantity: number = 0    
  creditCardYears: number[]=[]
  creditCadrMonths: number [] = []

  countries: Country[]= []
  states: State[] = []

  shippingAddressStates: State[] = []
  billingAddressStates: State[] = []




  ngOnInit(): void {

    this.cardType = [
      {
        name: "MasterCard",
      },
       {
        name: "visa",
      }]

      
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];



    this.checkoutFormGroup = this.fb.group({
      customer: this.fb.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhiteSpace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhiteSpace]),
        email: new FormControl('',
         [ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), ShopValidators.notOnlyWhiteSpace])
      }),
      shippingAddress: this.fb.group({
        street: new FormControl('', [Validators.required, Validators.minLength(5), ShopValidators.notOnlyWhiteSpace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhiteSpace]),
        state: new FormControl('', Validators.required),
        country:  new FormControl('', Validators.required),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhiteSpace]),
      }),
      billingAddress: this.fb.group({
        street: new FormControl('', [Validators.required, Validators.minLength(5), ShopValidators.notOnlyWhiteSpace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhiteSpace]),
        state: new FormControl('', Validators.required),
        country:  new FormControl('', Validators.required),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhiteSpace]),
      }),
      creditCard: this.fb.group({
        cardType: new FormControl('', Validators.required),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhiteSpace]),
        cardNumber: new FormControl('', [Validators.pattern('[0-9]{16}]')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        expirationMonth: [''],
        expirationYear: [''],

      })
    })

    // populate credit card months

    const startMonth: number = new Date().getMonth() + 1;

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCadrMonths = data;
      }
    )

    // populate credit card years
    const startYear: number = new Date().getFullYear();

    this.formService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    )

    //populate countries
    this.formService.getCountries().subscribe(
      data => {
        this.countries = data;
        console.log(data)
      }
    )

    this.reviewCartDetails()
  }

  reviewCartDetails() {
    // susbscribe to cart service quantity and price
    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data
      }

    )  

     this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data
      }

    ) 
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName')
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName')
  }

   get email() {
    return this.checkoutFormGroup.get('customer.email')
  }

  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country')
  }
  
  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city')
  }

  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state')
  }

  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street')
  }


  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode')
  }


  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country')
  }
  
  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city')
  }

  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state')
  }

  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street')
  }


  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode')
  }

  get creditCardType() {
    return this.checkoutFormGroup.get('creditCard.cardType')
  }

  get creditCardNameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard')
  }

  get creditCardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber')
  }

  get creditCardSecurityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode')
  }
  


  onSubmit() {
    console.log(this.checkoutFormGroup.get('billingAddress')?.value)
    console.log("The shipping Address Country = " + this.checkoutFormGroup.get('shippingAddress')?.value.country.name)
    console.log("The shipping Address State = " + this.checkoutFormGroup.get('shippingAddress')?.value.state.name)

    if(this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }

  }

  copyShippingToBillingAddress(event: any) {
    if(event.checked) {
      this.checkoutFormGroup.controls['billingAddress']
      .setValue(this.checkoutFormGroup.controls['shippingAddress'].value)

      this.billingAddressStates = this.shippingAddressStates
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset()

      this.billingAddressStates = []
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear = Number(creditCardFormGroup?.value.expirationYear)

    let startMonth: number

    if(currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCadrMonths = data; 
      }
    )
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code
    const countryName =  formGroup?.value.country.name 

    console.log(countryCode, countryName)
    this.formService.getStates(countryCode).subscribe(
      data => {
        console.log(data)
        if(formGroupName === 'shippingAddress') {
            this.shippingAddressStates = data
        } else {
          this.billingAddressStates = data
        }

        //select first item by default
        formGroup?.get('state')?.setValue(data[0]);
      }
    )
  }
}
