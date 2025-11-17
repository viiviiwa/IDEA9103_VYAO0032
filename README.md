# IDEA9103 -  TutGroup-D 
## VYAO0032 

### Instructions on interaction : 
Click the play button below the bull and wait for the music to start  

### Animation 
The main driver of this submission is Audio. 
The geometric shapes change size depending on the frequency of the audio. 

### References
![pulsation](inspo1.gif)
I wanted to create a pulsation effect on the bull, that responded to the frequencies of the audio. I wanted to include smooth transitions, inspired by this gif. 

### Techincal 
The first thing i set up was a new file, to hold the audio. 
I added a toggleable button, that is able to pause and play the music. 

To have the bull respond to the audio frequencies, I adjusted the main group code (animate.js). This allowed me to control the objects of the bull. 
I changed the bull-foreground image, as it allowed for a clearer distinction between the bull (black) and the background. 
In order for the pulsations to be clearer, I updated the sizes of the bull objects. 