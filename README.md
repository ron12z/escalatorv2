<h1>Structure guide:</h1>
The list of **restrictions** is just a ```.json``` file




<h1>Update/Edit guide:</h1>
(You have to accept the invitation to be a collaborator first)

**1.** Open the repository on your browser: https://github.com/ron12z/escalatorv2<br>
**2.** To start editing code, press the dot/period ```.``` key on your keyboard. (If it's not working, click on any part of the page first)<br>
**3.1** To edit/update restrictions:<br>
-Navigate to the ```restriction.json``` file (data>restriction.json), click it, then make your changes.<br>
<img width="353" height="194" alt="image" src="https://github.com/user-attachments/assets/5c138795-4480-4bca-be88-920358927439" />

-When you're done editing, open the ```Source Control``` on the left side of the page<br>
-Add a short description (or just put anything if you're feeling lazy or can't think of a description) about the changes you made, then click ```Commit & Push```<br>
<img width="349" height="183" alt="image" src="https://github.com/user-attachments/assets/47546911-36bb-48b5-9f2d-775c24241cae" />
-Wait for the updates to reflect on the page (Escalator)<br>
-Done. You may now close github or proceed to log your changes.


<br>

**3.2** Log Changes/Updates Made (Optional, but recommended):<br>
-Navigate to the ```updates.astro``` file (pages>updates.astro), click it, then make your changes.<br>
<img width="351" height="402" alt="image" src="https://github.com/user-attachments/assets/23dbdfd8-b0f3-4673-8a91-146b5bbc2451" />

(Add this code above the most recent [```<Update>```] tag),
**follow the format when editing, remove square brackets:**<br>
```astro
<Update date="[insert date here (eg. April 27, 2026)]">
 	<p>[Describe your updates/changes here]</p>
 	<p>[One <p></p> line = one line on the page]</p>
</Update>
```

<br>

_**FULL SAMPLE:**_
```astro
<Update date="April 27, 2026">
	<p>Updated "Name Mismatch: Subsequent Infraction" escalation note</p>
</Update>
```
**Code above will make:**
<img width="597" height="93" alt="image" src="https://github.com/user-attachments/assets/437dc8f6-eb22-4b6a-8795-825bc40c11bd" />


-When you're done editing, open the ```Source Control``` on the left side of the page<br>
-Add a short description (or just put anything if you're feeling lazy or can't think of a description) about the changes you made, then click ```Commit & Push```<br>
<img width="344" height="179" alt="image" src="https://github.com/user-attachments/assets/cbba0044-c1cd-47af-b5ab-3f99fb47aec8" />

-Wait for the updates to reflect on the page (Escalator)<br>
-Done. You can now close github.
