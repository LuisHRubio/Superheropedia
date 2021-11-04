var ID = "298";

var direccion = "https://www.superheroapi.com/api.php/4516680161725331/" + ID;

$.getJSON(direccion,
    function(data){
        console.log(data);

        var img = data.image.url;
        var name = data.name;

        $('#icon').attr('src',img);
        $('#name').append(name);
    }
);


