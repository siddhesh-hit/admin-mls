class Car {
  constructor(brand) {
    this.brand = brand;
  }

  get() {
    console.log("This is a get method", this.brand);
  }

  update() {
    console.log("This is a put method", this.brand);
  }
}

class Model extends Car {
  constructor(brand, mod) {
    super(brand);
    this.mod = mod;
  }

  get() {
    console.log("This is a get method", this.get(), this.mod);
  }
}

const check = new Car("Sidd");

const mod1 = new Model("Sidd", "Check");

mod1.get();
