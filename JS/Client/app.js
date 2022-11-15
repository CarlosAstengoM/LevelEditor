//Copyright (c) Carlos Astengo 2022, All rights reserved

export default class app
{
    constructor()
    {
        $(".prefab")
            .on("dragstart", event =>
            {

                const data = 
                {
                    id : event.target.id,
                    offsetX : event.offsetX,
                    offsetY : event.offsetY,
                };
                const jsonData = JSON.stringify(data);
                event.originalEvent.dataTransfer.setData("text", jsonData);
            });


        $("#game-editor")
            .on("dragover", event => 
            {
                event.preventDefault();
            })
            .on("drop", event => 
            {
                event.preventDefault();

                if(event.originalEvent.toElement.id != "game-editor")
                {
                    return;
                }
                
                const jsonData = event.originalEvent.dataTransfer.getData("text");
                const data = JSON.parse(jsonData);
                
                const cloneObject = $(`#${data.id}`).clone(false);
                
                let x = event.offsetX - data.offsetX;
                let y = event.offsetY - data.offsetY;

                cloneObject.css("top",y);
                cloneObject.css("left",x);
                cloneObject.addClass("placed");
                cloneObject.removeClass("prefab");

                cloneObject
                .on("dragstart", event =>
                {
                    const data = 
                    {
                        id : event.target.id,
                        offsetX : event.offsetX,
                        offsetY : event.offsetY,
                    };
                    const jsonData = JSON.stringify(data);
                    event.originalEvent.dataTransfer.setData("text", jsonData);
                });

                $("#game-editor").append( cloneObject);
            });
    }
}