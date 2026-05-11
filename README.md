<h1>Update/Edit guide:</h1>

(You have to accept the invitation to be a collaborator first)

**1.** Open the repository on your browser: https://github.com/ron12z/escalatorv2<br>
**2.** To start editing code, press the dot/period [**.**] key on your keyboard. (If it's not working, click on any part of the page first)<br>
**3.1** To edit/update restrictions:<br>
-Navigate to the [**restriction.json**] file (data>restriction.json), click it, then make your changes.<br>
-When you're done editing, open the [**Source Control**] on the left side of the page<br>
-Add a short description (or just put anything if you're feeling lazy or can't think of a description) about the changes you made, then click [**Commit & Push**]<br>
-Wait for the updates to reflect on the page<br>
-Done


<br>

**3.2** Optional (For update logs):<br>
-Navigate to the [**updates.astro**] file (pages>updates.astro), click it, then make your changes.<br>
<br>
**Follow the format, remove square brackets:**<br>
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

-When you're done editing, open the [**Source Control**] on the left side of the page<br>
-Add a short description (or just put anything if you're feeling lazy or can't think of a description) about the changes you made, then click [**Commit & Push**]<br>
-Wait for the updates to reflect on the page<br>
-Done<br>
