import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Checkbox, CheckboxChangeEvent } from 'primeng/checkbox';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { ShopFormService } from '../../services/shop-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';


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
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.fb.group({
        street: [''],
        city: [null],
        state: [''],
        country: [null],
        zipCode: [''],
      }),
      billingAddress: this.fb.group({
        street: [''],
        city: [null],
        state: [''],
        country: [null],
        zipCode: [''],
      }),
      creditCard: this.fb.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
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
  }


  onSubmit() {
    console.log(this.checkoutFormGroup.get('billingAddress')?.value)
    console.log("The shipping Address Country = " + this.checkoutFormGroup.get('shippingAddress')?.value.country.name)
    console.log("The shipping Address State = " + this.checkoutFormGroup.get('shippingAddress')?.value.state.name)

  }

  copyShippingToBillingAddress(event: any) {
    if(event.checked) {
      this.checkoutFormGroup.controls['billingAddress']
      .setValue(this.checkoutFormGroup.controls['shippingAddress'].value)
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset()
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
