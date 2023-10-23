<template>
    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center" style="margin-top: 2%;">
            <h1>Products</h1>
        </div>

        <div class="d-flex justify-content-around flex-wrap">
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="max-width: 300px; padding: 2% 0;">
                <span>Select a Category:</span>
                <select class="form-select" aria-label="Filter By Category" @change="eventCategory">
                    <option selected value="All Categories">All Categories</option>
                    <option v-for="category in categories" :value="category"> {{ category }}</option>
                </select>
            </div>

            <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="max-width: 300px; padding: 2% 0;">
                <span>Filter By:</span>
                <select class="form-select" aria-label="Filter By" @change="eventFilter" v-model="filter">
                    <option selected value="0">No Filter</option>
                    <option v-for="f in filters" :value="f.value">{{ f.name }}</option>
                </select>
            </div>
        </div>

        <div class="d-flex justify-content-around flex-wrap" style="padding: 2%;">
            <div v-for="product in products" class="card col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 product" style="width: 16rem; margin: 10px;">
                <div class="d-flex justify-content-around" style="height: 50%; padding: 2%;">
                    <img :src="product.image" class="card-img-top" :alt="product.title">
                </div>
                <div class="card-body title">
                    <div style="height: 40%; margin-top: 2%; overflow: hidden; text-overflow: ellipsis;">
                        <span class="card-text" style="font-size: 13px;" tabindex="0" data-toggle="tooltip" :title="product.title">{{ product.title }}</span>
                    </div>
                    <div style="height: 25%; margin-top: 2%;">
                        <h4 style="color: green;">{{ new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(product.price) }}</h4>
                    </div>
                    
                    <div style="height: 25%; margin-top: 2%;">
                        <span style="font-size: 13px;">Assessment: {{ product.rating.rate }} </span>
                    </div>
                </div>

                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style="margin: 10px;" @click="getProduct(product.id)">Buy</button>

            </div>
        </div>

        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ product.title }}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div class="modal-body row">
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-around" style="margin-top: 10px;">
                        <img :src="product.image" :alt="product.title">
                    </div>

                    <div class="d-flex flex-column justify-content-around col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="margin-top: 10px;">
                        <h4>Price: {{ new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(product.price) }}</h4>
                        <div v-if="product.rating">
                            <p>Assessment: {{ product.rating.rate ?? '' }}</p>
                            <p>Amount: {{ product.rating.count ?? '' }}</p>
                        </div>
                    </div>

                    <div class="row">
                        <h4>Description:</h4>
                        <span>{{ product.description }}</span>
                    </div>
                </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    data(){
        return{
            products: [],
            product: {},
            categories: [],
            category: '',
            filters: [{'value': 1, 'name': 'Biggest Price'}, {'value': 2, 'name': 'Lowest Price'}],
            filter: 0
        }
    },
    methods: {
        getProducts() {
            fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=> {this.products = json; console.log(json)})
        },

        getProduct(id) {
            fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json=> { this.product = json })
        },

        getCategories(){
            fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=> {this.categories = json;} )
        },

        eventCategory(args) {
            this.category = args.target.value;
            this.filter = 0;
            if (args.target.value === 'All Categories') {
                this.getProducts();
                return;
            }

            fetch(`https://fakestoreapi.com/products/category/${args.target.value}`)
            .then(res=>res.json())
            .then(json=> {this.products = json;})
        },

        eventFilter(args) {
            if (args.target.value == 0) {
                if (this.category) {
                    fetch(`https://fakestoreapi.com/products/category/${this.category}`)
                    .then(res=>res.json())
                    .then(json=> {this.products = json;})
                    return;
                }
                this.getProducts();
            }
            if (args.target.value == 1) {
                this.sortMaxValue();
                return;
            }
            if (args.target.value == 2) {
                this.sortMinValue();
                return;
            }
        },

        sortMaxValue() {
            for ( var i=0; i < this.products.length; i++ ) {
                for (var x= i + 1; x < this.products.length; x++) {
                    if ( this.products[i].price < this.products[x].price ) {
                        let aux = this.products[x]
                        this.products[x] = this.products[i]
                        this.products[i] = aux
                        //console.log(this.products[i].price > this.products[x + 1].price)
                        //this.products[i], this.products[x+1]  = this.products[x+1], this.products[i];
                    }
                }
            }
        },

        sortMinValue() {
            for ( var i=0; i < this.products.length; i++ ) {
                for (var x= i + 1; x < this.products.length; x++) {
                    if ( this.products[i].price > this.products[x].price ) {
                        let aux = this.products[x]
                        this.products[x] = this.products[i]
                        this.products[i] = aux
                        //console.log(this.products[i].price > this.products[x + 1].price)
                        //this.products[i], this.products[x+1]  = this.products[x+1], this.products[i];
                    }
                }
            }
        } 
    },
    mounted() {
        this.getProducts();
        this.getCategories();
    }
}

</script>

<style>



img {
    max-width:200px;
    max-height:150px;
    width: auto;
    height: auto;
    object-fit: contain;
}

.title {
    overflow: hidden;
    max-width: 100%;
    height: 40%;
    padding: 1rem 1rem 0 1rem;
}

.btn-primary {
    border-radius: 5px;
    cursor: pointer;
    transition: all .5s;
}

.btn-primary span {
    padding: 5px;
}

.btn-primary:hover {
    background-color: green;
    border-color: green;
}

</style>
