export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" /><br/>
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <label htmlFor="wd-select-one-genre">
    Assignment Group: </label><br/>
<select id="wd-select-one-genre">
   <option value="ASSIGNMENT">Assignment</option>
   <option value="QUIZ">Quiz</option>
   <option selected value="EXAM">Exam</option>
   <option value="PROJECT">Project</option>
</select><br/>
<label htmlFor="wd-select-one-genre">
    Display Grade: </label><br/>
<select id="wd-select-one-genre">
   <option value="YES">Yes</option>
   <option value="NO">No</option>
</select><br/>
<label htmlFor="wd-select-one-genre">
    Submission Type: </label><br/>
<select id="wd-select-one-genre">
   <option value="FILE">File</option>
   <option value="TEXT">Text</option>
      <option value="NONE">None</option>
</select> <br/>
<label>Online Entry Options:</label><br/>

<input type="checkbox" name="check-genre" id="wd-chkbox-pdf"/>
<label htmlFor="wd-chkbox-pdf">PDF</label><br/>

<input type="checkbox" name="check-genre" id="wd-chkbox-link"/>
<label htmlFor="wd-chkbox-link">Link</label><br/>

<input type="checkbox" name="check-genre" id="wd-chkbox-slides"/>
<label htmlFor="wd-chkbox-slides">Slides</label><br/>

<h3>Assign to</h3>
<input defaultValue="Everyone" placeholder="Assign to.." /> <br />

<label htmlFor="wd-text-fields-due">
Due Date: </label>
<input type="date"
      id="wd-text-fields-due"
      value="2025-09-19"/><br/>

      <label htmlFor="wd-text-fields-available">
Available from: </label>
<input type="date"
      id="wd-text-fields-available"
      value="2025-09-09"/><br/>

      <label htmlFor="wd-text-fields-until">
Until: </label>
<input type="date"
      id="wd-text-fields-until"
      value="2025-09-20"/><br/>
      </table>
    </div>
);}
