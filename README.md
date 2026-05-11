<h1>Part 1: Structure guide:</h1>

-The list of ```restriction``` items can be found in the ```restriction.json``` file. Structure is as follows:<br>
-Each ```restriction``` item is enclosed in curly braces ```{}```, separated by comma, with key and value pairs inside```"key" : "value"```<br>
-All restrictions **MUST** have these 4 keys (and values): **id, display, description, escalation**<br>
<br>
-There are 3 types of restriction:<br>
<ul>
  <li><b>Plain restriction</b> - Does not require any additional input/information. One example is the "Multiple Phone Numbers" restriction:<br>
  <img width="434" height="216" alt="image" src="https://github.com/user-attachments/assets/fdb82fdf-71bc-4ddb-95de-4be993e6318e" />
  </li><br>
  <li><b>Restriction + option</b> - Required to choose one option from the defined choices. One example is the "Account Status" restriction:<br>
  <img width="562" height="305" alt="image" src="https://github.com/user-attachments/assets/88847cfb-5fea-4ac6-b6b8-b4d18f06353d" />
  </li><br>
  <li><b>Restriction + text (grouped as slot1, slot2, slot3, slot4)</b> - Required to provide additional information via text inputs. One example is the "Cashed Out" restriction:<br>
  <img width="953" height="338" alt="image" src="https://github.com/user-attachments/assets/9a0404ea-60d6-405c-a4ae-925bae1a5034" /><br>
  <img width="961" height="333" alt="image" src="https://github.com/user-attachments/assets/a3eacdc3-a839-45aa-8743-6ed82bf5ce32" />

	
  </li>
</ul>

_Keys Guide:_
<table>
  <thead>
    <tr>
      <th>Field Key</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>A unique identifier for the restriction item. Just put anything you want as long as it's not a duplicate of any other id. Not visible on the page</td>
    </tr>
    <tr>
      <td><code>display</code></td>
      <td>The text/label of the restriction item</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>A tooltip that shows when you hover over a restriction item</td>
    </tr>
    <tr>
      <td><code>escalation</code></td>
      <td>The escalation note that is added to the final template when the restriction is active</td>
    </tr>
	<tr>
      <td><code>additionalDesc</code></td>
      <td>Describes what additional information is needed for the restriction. This key is required if the restriction type is <b>Restriction + option</b> or <b>Restriction + text</b>. Otherwise, the options area or input area will not be visible when clicking a restriction.</td>
    </tr>
	<tr>
      <td><code>slot#</code></td>
      <td>Indicates that the restriction requires additional text input. Input fields are grouped based on slot number (eg. slot1).  It should also contain key-value pairs inside it in this format: <code>"Placeholder text" : Number of minimum input fields required</code> (eg. <code>"Card Number" : 5</code>).</td>
    </tr>
	<tr>
      <td><code>addMoreButton</code></td>
      <td>Child key of a <b>slot#</b> key. If an input slot may require more input fields (eg. May have multiple withdrawal payment methods), then this key should be added, and its value should be <b>true</b>.</td>
    </tr>
	<tr>
      <td><code>hasStatusOption</code> and <code>preset</code></td>
      <td>Child key of a <b>slot#</b> key. If the additional text field requires an Account Status beside it (See "Tableau Device Sharing" restrictions), these keys should be added like: <br><code>"hasStatusOption": true,</code><br>
			<code>"preset": "[value] ([option])"</code><br></td>
    </tr>
	<tr>
      <td><code>options</code></td>
      <td>Indicates that the restriction requires the have one option selected. It should also contain key-value pairs inside it in this format: <code>"Option Name" : "Option value"</code> <br>(eg. <code>"Suspended": "is suspended"</code>)</td>
    </tr>
  </tbody>
</table>

<h2>Sample restriction items for visualization</h1>

**Example 1 - Plain restriction:**
```json
	{
		"id": "multiple_phones",
		"display": "Multiple Phone Numbers",
		"description": "Account is less than a month old AND has 2 or more phone number OR one phone number in Sift but has history of phone number change in NATS",
		"escalation": "2 different phone numbers"
	}
```

**Output**<br>
<img width="1277" height="220" alt="image" src="https://github.com/user-attachments/assets/50c13b47-24d2-4540-8bd2-93448bd50264" />
<br>

**Example 2 - Restriction + option:**
```json
	{
		"id": "threshold",
		"display": "Amount",
		"description": "WD amount greater than allowed threshold ($25k for VIP, $24,999.99 for NOT VIP)",
		"escalation": "WD greater than [option]",
		"additionalDesc": "Account Level",
		"options": {
			"VIP": "$25k",
			"Not VIP": "$24,999.99",
			"100k": "$100k"
		}
	},
```

**Output**<br>
<img width="1280" height="300" alt="image" src="https://github.com/user-attachments/assets/e4e49197-27b6-4be6-bd94-19ce6b9c35a7" />

<br>

**Example 3 - Restriction + text:**
```json
	{
		"id": "cashout2",
		"display": "Cashed Out",
		"description": "Has cashed out bet between deposit and withdrawal, and the stake/settlement percentage is equal or less than 25%.",
		"escalation": "cashed out bet between deposit ([slot1]) and latest withdrawal ([slot2])",
		"additionalDesc": "Card Details",
		"slot1": {
			"Deposit Payment Method": 1,
			"addMoreButton": true
		},
		"slot2": {
			"Withdrawal Payment Method": 1,
			"addMoreButton": true
		}
	}
```

**Output**<br>

<br><br><br>


<hr>
<h1>Part 2: Update/Edit guide:</h1>
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
