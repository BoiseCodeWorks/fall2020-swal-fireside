<template>
  <main id="cars" class="container-fluid">
    <div class="row my-3">
      <button class="btn btn-success" @click="createCarForm">Add Car</button>

      <div class="col" id="form">
        <form @submit.prevent="createCar" class="form-inline" v-if="showForm">
          <div class="form-group p-1">
            <label class="mr-1" for="make">Make</label>
            <input
              v-model="newCar.make"
              type="text"
              name="make"
              id="make"
              class="form-control"
              placeholder="Make..."
            />
          </div>
          <div class="form-group p-1">
            <label class="mr-1" for="model">Model</label>
            <input
              v-model="newCar.model"
              type="text"
              name="model"
              id="model"
              class="form-control"
              placeholder="Model..."
            />
          </div>
          <div class="form-group p-1">
            <label class="mr-1" for="year">Year</label>
            <input
              v-model="newCar.year"
              type="number"
              name="year"
              id="year"
              class="form-control"
              placeholder="Year..."
              min="1900"
              max="2021"
            />
          </div>
          <div class="form-group p-1">
            <label class="mr-1" for="price">Price</label>
            <input
              v-model="newCar.price"
              type="number"
              name="price"
              id="price"
              class="form-control"
              placeholder="Price..."
            />
          </div>
          <div class="form-group p-1">
            <label class="mr-1" for="description">Description</label>
            <input
              v-model="newCar.description"
              type="text"
              name="description"
              id="description"
              class="form-control"
              placeholder="Description..."
            />
          </div>
          <div class="form-group p-1">
            <label class="mr-1" for="img">Image Url</label>
            <input
              v-model="newCar.imgUrl"
              type="url"
              name="img"
              id="img"
              class="form-control"
              placeholder="Image Url..."
            />
          </div>
          <button type="submit" class="btn btn-outline-success">Add Car</button>
          <button type="button" class="btn btn-danger" @click="clearForm" v-if="showForm">Cancel</button>
        </form>
      </div>
    </div>
    <div class="row" id="data">
      <car v-for="car in cars" :key="car._id" :carData="car" />
    </div>
  </main>
</template>

<script>
import ns from "../services/NotificationService";
import Car from "../components/Car.vue";
export default {
  name: "Cars",
  mounted() {
    this.$store.dispatch("getAllCars");
  },
  data() {
    return {
      showForm: false,
      newCar: {},
    };
  },
  computed: {
    cars() {
      return this.$store.state.cars;
    },
  },
  methods: {
    createCar() {
      this.$store.dispatch("createCar", this.newCar);
      // PROTIP the object retains reference so we cant just reset it we will need to reset the form instead
      for (let key in this.newCar) {
        this.newCar[key] = null;
      }
      this.showForm = false;
    },
    clearForm() {
      this.showForm = false;
      this.newCar = {};
    },
    async createCarForm() {
      let data = await ns.inputData();
      console.log(data);
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.showForm) {
      next();
      return;
    }
    const answer = window.confirm(
      "Do you really want to leave? you have unsaved changes!"
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
  components: {
    Car,
  },
};
</script>

<style>
</style>