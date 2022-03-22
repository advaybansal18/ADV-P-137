objects=[];
status="";
video="";
function setup(){
    canvas=createCanvas(400,300);
    canvas.center();
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Cocossd is Initialized");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function draw(){
  image(video,0,0,400,300);
  if(status==true){
      objectDetector.detect(video,gotResult);
      for(a=0;a<objects.length;a++){
        document.getElementById("status").innerHTML="Status:Objects Detected";
        document.getElementById("number_of_objects").innerHTML="Number of Objects Detected Are: "+objects.length;
        fill("#d11739");
        percent=floor(objects[a].confidence*100);
        text(objects[a].label+" "+percent+" %",objects[a].x+14,objects[a].y+14);
        noFill();
        stroke("#d11739");
        rect(objects[a].x,objects[a].y,objects[a].width,objects[a].height);
      }
  }
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}