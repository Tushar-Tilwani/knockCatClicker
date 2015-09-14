var model = {
    currentCatIndex: 0,
    cats: [
        {name: "Triple H", image: "cat1.jpg", clickCount: 0, nickNames: ["bobby", "Mr B", "B the destroyer"]},
        {name: "Kane", image: "cat2.jpg", clickCount: 0, nickNames: ["tobby", "Mr t", "T the destroyer"]},
        {name: "Stone Cold", image: "cat3.jpg", clickCount: 0, nickNames: ["beer", "Mr B", "Beer the destroyer"]},
        {name: "Undertaker", image: "cat4.jpg", clickCount: 0, nickNames: ["bobby1", "Mr U", "U the destroyer"]},
        {name: "The Rock", image: "cat5.jpg", clickCount: 0, nickNames: ["Mr R", "R the destroyer"]},
        {name: "John Cena", image: "cat6.jpg", clickCount: 0, nickNames: ["bobby3", "Mr J", "J the destroyer"]}
    ]
};
var Cat = function (data) {
    this.catName = ko.observable(data.name);
    this.clickCount = ko.observable(data.clickCount);
    this.imgPath = ko.observable('css/images/' + data.image);
    this.nickNames = ko.observableArray(data.nickNames);

    this.catTitle = ko.computed(function () {
        return this.clickCount() < 10 ? "Infant" : "Adult";
    }, this);

};

var CatClickerViewModel = function () {
    var that = this;
    that.catList = ko.observableArray([]);

    model.cats.forEach(function (cat) {
        that.catList.push(new Cat(cat));
    });

    that.currentCat = ko.observable(that.catList()[0]);

    that.incClickCount = function () {
        that.currentCat().clickCount(that.currentCat().clickCount() + 1);// Goes in with the context of with.
    };

    that.showCat = function (i) {
        return function(){
            that.currentCat(that.catList()[i]);
        }
    };
};
ko.applyBindings(new CatClickerViewModel());