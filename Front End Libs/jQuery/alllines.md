The input elements elements should be set up like. Note the new class "radio-group" added to the top-level div. This is just a convenience to help us find it later in the script:

```html
<div
  class="form-group col-md-1 ml-md-2 radio-group"
  role="radiogroup"
  aria-labelledby="lblSpecialPermissionNeeded_0"
>
  <div id="lblSpecialPermissionNeeded_0" class="radio-group-label">
    Special Permission Needed
  </div>
  <div>
    <div class="custom-control custom-radio custom-control-inline">
      @Html.RadioButtonFor(m => m.Course.Location[0].SpecialPermissionNeeded,
      "No", new { id = "rdSpecialPermissionNeededNo_0", @class =
      "custom-control-input" })
      <label class="custom-control-label" for="rdSpecialPermissionNeededNo_0">
        No
      </label>
    </div>
    <div class="custom-control custom-radio custom-control-inline">
      @Html.RadioButtonFor(m => m.Course.Location[0].SpecialPermissionNeeded,
      "Yes", new { id = "rdSpecialPermissionNeededYes_0", @class =
      "custom-control-input" })
      <label class="custom-control-label" for="rdSpecialPermissionNeededYes_0">
        Yes
      </label>
    </div>
  </div>
</div>
```

This should work and should be added to the "addLocation()" function, in the "a.dev_addLocation" click handler function, after the var "tabData" is set.

```javascript
tabData.find(".radio-group").each(function () {
  // set a ver with the radio-group-label $ element
  var rgl = $(this).find(".radio-group-label");
  // set a var with the radio-group-label $ element's id property
  var id = rgl.prop("id");
  // set a var with the derived new id
  var newId = id.replace("_0", `_${count}`);
  // set the radio-group-label $ element's id property
  rgl.prop("id", newId);
  // set the radio-group $ element's aria-labelledby attribute
  $(this).attr("aria-labelledby", newId);
});
```

There is some cloning done in the document ready handler, but I think that it's redundant and extraneous, so I don't think we need to add anything there.
