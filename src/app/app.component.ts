import { Component } from '@angular/core';
import Ajv from 'ajv';
import { saveAs } from 'file-saver';
import fieldsInvalid from '../assets/fieldsInvalid';
import defaultError from 'src/assets/defaultError';
import { Renderer2, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  dataInTextarea: string = '';
  schemaInTextarea: string = '';
  valid: string = '';
  num: number = 47.7;
  marginTop: number = -1050;
  rowIndexes: number[] = [];
  rowIndexes2: number[] = [];
  moreInfo: string = "No Information";
  dataInTextareaWithNumber: string = '';
  tmp: string = '';
  objectOrArrayType: string[][] = [];
  syntaxError:number=0;
  netanel:string="All Rights Reserved Netanel & Avi ©";

  /*to display line numbers to textarea(with scroll,input,key) - begin*/
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    debugger;
    // Call the function when the page loads
    this.lineCounter();
    this.lineCounter2();
    const codeEditor = this.el.nativeElement.querySelector('#codeEditor');
    const codeEditor2 = this.el.nativeElement.querySelector('#codeEditor2');
    this.renderer.listen(codeEditor, 'scroll', () => {
      this.lineCounter();
    });
    this.renderer.listen(codeEditor2, 'scroll', () => {
      this.lineCounter2();
    });

    // listenner
    this.renderer.listen(codeEditor, 'keydown', (e) => {
      let { keyCode } = e;
      let { value, selectionStart, selectionEnd } = codeEditor;
      if (keyCode === 9) {
        e.preventDefault();
        codeEditor.value = value.slice(0, selectionStart) + '\t' + value.slice(selectionEnd);
        codeEditor.setSelectionRange(selectionStart + 2, selectionStart + 2);
        this.lineCounter();
      }
    });
    this.renderer.listen(codeEditor2, 'keydown', (e) => {
      let { keyCode } = e;
      let { value, selectionStart, selectionEnd } = codeEditor2;
      if (keyCode === 9) {
        e.preventDefault();
        codeEditor2.value = value.slice(0, selectionStart) + '\t' + value.slice(selectionEnd);
        codeEditor2.setSelectionRange(selectionStart + 2, selectionStart + 2);
        this.lineCounter2();
      }
    });

    this.renderer.listen(codeEditor, 'input', () => {
      this.lineCounter();
    });
    this.renderer.listen(codeEditor2, 'input', () => {
      this.lineCounter2();
    });
  }

//to json
  lineCounter() {
    debugger;
    const codeEditor = this.el.nativeElement.querySelector('#codeEditor');
    const lineCounter = this.el.nativeElement.querySelector('#lineCounter');
    const lineCount = codeEditor.value.split('\n').length;
    const scrollTop = codeEditor.scrollTop;
    const lineHeight = parseInt(getComputedStyle(codeEditor).lineHeight);
    const startLine = Math.floor(scrollTop / lineHeight) + 1;
  
    // Clear previous content
    lineCounter.innerHTML = '';
    for (let x = startLine; x <= lineCount; x++) {
      const lineElement = this.renderer.createElement('div');
      lineElement.classList.add('line-number');
  
      if (this.rowIndexes.includes(x)) {
        const spanElement = this.renderer.createElement('span');
        spanElement.classList.add('red-line');
        spanElement.textContent = `${x}.`;
        this.renderer.appendChild(lineElement, spanElement);
      } else {
        lineElement.textContent = `${x}.`;
      }
  
      this.renderer.appendChild(lineCounter, lineElement);
    }
  }

  addLineNumbers() {
    debugger;
    const codeEditor = this.el.nativeElement.querySelector('#codeEditor');
    const lineCounter = this.el.nativeElement.querySelector('#lineCounter');
    const lineCount = codeEditor.value.split('\n').length;
    const scrollTop = codeEditor.scrollTop;
    const lineHeight = parseInt(getComputedStyle(codeEditor).lineHeight);
    const startLine = Math.floor(scrollTop / lineHeight) + 1;
  
    // Clear previous content
    lineCounter.innerHTML = '';
  
    for (let x = startLine; x <= lineCount; x++) {
      const lineElement = this.renderer.createElement('div');
      lineElement.classList.add('line-number');
  
      if (this.rowIndexes.includes(x)) {
        const spanElement = this.renderer.createElement('span');
        spanElement.classList.add('red-line');
        spanElement.textContent = `${x}.`;
        this.renderer.appendChild(lineElement, spanElement);
      } else {
        lineElement.textContent = `${x}.`;
      }
  
      this.renderer.appendChild(lineCounter, lineElement);
    }
  }

  //to schema
  lineCounter2() {
    debugger;
    const codeEditor = this.el.nativeElement.querySelector('#codeEditor2');
    const lineCounter = this.el.nativeElement.querySelector('#lineCounter2');
    const lineCount = codeEditor.value.split('\n').length;
    const scrollTop = codeEditor.scrollTop;
    const lineHeight = parseInt(getComputedStyle(codeEditor).lineHeight);
    const startLine = Math.floor(scrollTop / lineHeight) + 1;
  
    // Clear previous content
    lineCounter.innerHTML = '';
    for (let x = startLine; x <= lineCount; x++) {
      const lineElement = this.renderer.createElement('div');
      lineElement.classList.add('line-number');
  
      if (this.rowIndexes2.includes(x)) {
        const spanElement = this.renderer.createElement('span');
        spanElement.classList.add('red-line');
        spanElement.textContent = `${x}.`;
        this.renderer.appendChild(lineElement, spanElement);
      } else {
        lineElement.textContent = `${x}.`;
      }
  
      this.renderer.appendChild(lineCounter, lineElement);
    }
  }

  addLineNumbers2() {
    const codeEditor = this.el.nativeElement.querySelector('#codeEditor2');
    const lineCounter = this.el.nativeElement.querySelector('#lineCounter2');
    const lineCount = codeEditor.value.split('\n').length;
    const scrollTop = codeEditor.scrollTop;
    const lineHeight = parseInt(getComputedStyle(codeEditor).lineHeight);
    const startLine = Math.floor(scrollTop / lineHeight) + 1;
  
    // Clear previous content
    lineCounter.innerHTML = '';
    for (let x = startLine; x <= lineCount; x++) {
      const lineElement = this.renderer.createElement('div');
      lineElement.classList.add('line-number');
  
      if (this.rowIndexes2.includes(x)) {
        const spanElement = this.renderer.createElement('span');
        spanElement.classList.add('red-line');
        spanElement.textContent =  `${x}.`;
        this.renderer.appendChild(lineElement, spanElement);
      } else {
        lineElement.textContent = `${x}.`;
      }
  
      this.renderer.appendChild(lineCounter, lineElement);
    }
  }
  /*end/*

/* function to select json from list and add number row */
selectJsonFromList(event: Event) {
  debugger;
  const selectElement = event.target as HTMLSelectElement;
  const selectedFile = selectElement.value;
  const file = `assets/${selectedFile}`;
  
  fetch(file)
    .then(response => response.json()) // Parse response as JSON
    .then(content => {
      const formattedContent = JSON.stringify(content, null, 1); // Format with indentation
      
      this.dataInTextarea = formattedContent;
      const codeEditor = this.el.nativeElement.querySelector('#codeEditor');
      const lineCounter = this.el.nativeElement.querySelector('#lineCounter');

      // Clear previous content and row indexes
      lineCounter.innerHTML = '';
      this.rowIndexes = []; // Assuming you have a variable like this.rowIndexes

      // Now update the content and line numbers
      setTimeout(() => {
        this.addLineNumbers();
      });
    })
    .catch(error => console.log(error));
}

  

/* function to upload json from file */
uploadFileJson(event: Event) {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      
      try {
        const parsedData = JSON.parse(content);
        const formattedData = JSON.stringify(parsedData, null, 1);
        this.dataInTextarea = formattedData;

        const codeEditor = this.el.nativeElement.querySelector('#codeEditor');
        const lineCounter = this.el.nativeElement.querySelector('#lineCounter');

        // Clear previous content and row indexes
        lineCounter.innerHTML = '';
        this.rowIndexes = []; // Assuming you have a variable like this.rowIndexes

        // Now update the content and line numbers
        setTimeout(() => {
          this.addLineNumbers();
        });
      } catch (error) {
        console.log('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file);
  }
}



  /* function to update field/data in textarea of json check with a new change in json data */
  onTextareaChange(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.dataInTextarea = textarea.value;
  
    // Calculate the number of lines in the textarea
    const numLines = textarea.value.split('\n').length;
    this.rowIndexes = []; // Assuming you have a variable like this.rowIndexes

    // Update the line numbers based on the number of lines
    this.lineCounter();
  }
  
  //////////////////this part to schema
  

  /* function to update field/data in textarea of json check with a new change in json data */
  onTextareaChangeSchema(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.schemaInTextarea = textarea.value;
  
    // Calculate the number of lines in the textarea
    const numLines = textarea.value.split('\n').length;
    this.rowIndexes2 = []; // Assuming you have a variable like this.rowIndexes

    // Update the line numbers based on the number of lines
    this.lineCounter2();
  }

/* function to select schema from list and display with line numbers */
selectSchemaFromList(event: Event) {
  debugger;
  const selectElement = event.target as HTMLSelectElement;
  const selectedFile = selectElement.value;
  const file = `assets/${selectedFile}`;
  
  fetch(file)
    .then(response => response.text())
    .then(text => {
      const formattedText = this.formatJSON(text); // Format the schema text
      this.schemaInTextarea = formattedText;
      const codeEditor = this.el.nativeElement.querySelector('#codeEditor2');
      const lineCounter = this.el.nativeElement.querySelector('#lineCounter2');
      
      // Clear previous content and row indexes
      lineCounter.innerHTML = '';
      this.rowIndexes2 = []; // Assuming you have a variable like this.rowIndexes2
      
      // Now update the content and line numbers
      setTimeout(() => {
        this.addLineNumbers2();
      });
    })
    .catch(error => console.log(error));
}

// Function to format JSON with indentation
formatJSON(jsonText: string): string {
  try {
    const parsedData = JSON.parse(jsonText);
    return JSON.stringify(parsedData, null, 1);
  } catch (error) {
    console.log('Error parsing JSON:', error);
    return jsonText; // Return as-is if parsing fails
  }
}


  /* function to upload schema from file */
  uploadFileSchema(event: Event){
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        const parsedData = JSON.parse(content);
        const formattedData = JSON.stringify(parsedData, null, 1);
        this.schemaInTextarea = formattedData;
        this.rowIndexes2 = []; // Assuming you have a variable like this.rowIndexes
        setTimeout(() => {
          this.addLineNumbers2(); // Call the function to add line numbers after a brief delay
        });
      };
      reader.readAsText(file);
    }
  }

  /* function to check data json with schema and return if valid or error */
  checkJsonToSchema() {
    debugger;
    this.syntaxError==0;  //to continue new check where is syntax
    const textJson = this.dataInTextarea;
    const textSchema = this.schemaInTextarea;
    const lines = this.dataInTextarea.split('\n');
    const divElementGreen = document.getElementById('myDivGreen');
    const divElementRed = document.getElementById('myDivRed');
    try {
      this.syntaxError=1;
      const json = JSON.parse(textJson);
      this.syntaxError=2;
      const schema = JSON.parse(textSchema);
      this.syntaxError=0;
      const ajv = new Ajv();
      debugger;
      const validateSyntaxSchema = ajv.compile(schema);
      this.valid = fieldsInvalid(textJson, textSchema); // Call the fieldsInvalid function js
      this.moreInfo = defaultError(textJson, textSchema); // Call the defaultError function js
      this.rowIndexes = []; // Assuming you have a variable like this.rowIndexes
      if (this.valid === 'Valid') {
        divElementGreen!.style.display = 'block';
        divElementRed!.style.display = 'none';
        divElementGreen!.innerHTML = 'Valid';
      } else {
        divElementRed!.style.display = 'block';
        divElementGreen!.style.display = 'none';
        divElementRed!.innerHTML =  "כדי לתקן את הקובץ החלף שדות המופיעים [בסוגריים מרובעים] בשדות נדרשים עם נתונים מתאימים"+ '<br>' + this.valid + '<br>' + "או" + '<br>' +":הוסף לקובץ שדות נדרשים עם נתונים מתאימים" + '<br>' + this.moreInfo ;
        this.findIndexOfRowErrorData();
      }
    } catch (error) {
      let addCatch=''
      divElementRed!.style.display = 'block';
      divElementGreen!.style.display = 'none';
       /* where is syntacs error textarea of data or textarea of schema? */
      if(this.syntaxError==1)
      {
        addCatch='שגיאת סינטקס בנתונים';
      }
      else if(this.syntaxError==2){
        addCatch='שגיאת סינטקס בסכמה';
      }
      this.valid='' + addCatch + '<br>' + error ;
      this.moreInfo=this.valid; //update info error from schema or syntax data
      divElementRed!.innerHTML = this.valid;
      this.findIndexOfRowErrorSchema();
      this.syntaxError==0;   
    }
  }
  

  /* function to check and create index of errors field and save in array */
  findIndexOfRowErrorData() {
    debugger;
    // Create an array of words
    const words1 = this.dataInTextarea.match(/(?:"[^"]*"|\b\w+\b)/g);
    const words2 = this.valid.match(/(?:"[^"]*"|\b\w+\b)/g);
    if (words1 && words2) {
      // Find shared words
      const sharedWords = words1.filter((word) => words2.includes(word));
      // Check if there are any shared words
      if (sharedWords.length > 0) {
        const rows: string[] = this.dataInTextarea.split('\n');
        this.rowIndexes = [];
        rows.forEach((row: string, index: number) => {
          // Check if any of the shared words are included in the row
          if (sharedWords.some((word) => row.includes(word))) {
            this.rowIndexes.push(index + 1);
          }
        });
      }
    }
    this.addLineNumbers();
  }

/* function to check and create index of errors field and save in array */
findIndexOfRowErrorSchema() {
  debugger;
  // Get rows and initialize rowIndexes2
  const rows = this.schemaInTextarea.split('\n');
  this.rowIndexes2 = [];

  // Extract unique field names after "properties/" from the valid text
  const fieldNamesInValid = [...new Set(this.valid.match(/(?<=properties\/)[^/]+/g))];

  if (fieldNamesInValid) {
    const seenFieldNames = new Set();

    rows.forEach((row, index) => {
      fieldNamesInValid.forEach(fieldName => {
        const fieldNameRegExp = new RegExp(`\\b${fieldName}\\b`);
        if (fieldNameRegExp.test(row) && !seenFieldNames.has(fieldName)) {
          seenFieldNames.add(fieldName);
          this.rowIndexes2.push(index + 1);
        }
      });
    });
  }

  // Check for SyntaxError in 'valid' and extract position
  const syntaxErrorMatch = this.valid.match(/SyntaxError: Expected [^ ]+ at position (\d+)/);
  if (syntaxErrorMatch) {
    const errorPosition = parseInt(syntaxErrorMatch[1]);
    // Find the line number based on the error position
    let lineNumber = 1;
    let currentPosition = 0;
    for (const row of rows) {
      if (currentPosition + row.length >= errorPosition) {
        break;
      }
      currentPosition += row.length + 1; // +1 for the newline character
      lineNumber++;
    }
    this.rowIndexes2.push(lineNumber);
  }

  this.addLineNumbers2();
}

    

  /* save buttons */
  /* button save current data */
  saveDataJson(): void {
    debugger;
    const jsonData = JSON.stringify(JSON.parse(this.dataInTextarea.replace(/^\d+\.\s/gm, ''))); // Save JSON data file and remove the row numbers from the new value
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, 'data.json');
  }

  /* button save current schema */
  saveSchema(): void {
    debugger;
    const jsonData = JSON.stringify(JSON.parse(this.schemaInTextarea.replace(/^\d+\.\s/gm, ''))); // Save JSON schema file and remove the row numbers from the new value
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, 'schema.json');
  }

  /* refresh screen */
  refreshScreen(): void {
    location.reload();
  }
/* hazahot */
  /* Function to fix text order */
  /* Function to format JSON content by reordering key-value pairs */
  fixSpaceAndLineJson() {
  debugger;
  try {
    const parsedData = JSON.parse(this.dataInTextarea);
    if (typeof parsedData === 'object') {
      const orderedData = this.newFixTextJson(parsedData); // Call the function to reorder key-value pairs
      const formattedData = JSON.stringify(orderedData, null, 1);
      this.dataInTextarea = formattedData;
    } else {
      console.log('Invalid JSON object');
    }
  } catch (error) {
    console.log('Error parsing JSON:', error);
  }
}

/* Function to reorder key-value pairs */
newFixTextJson(jsonData: Record<string, any>): Record<string, any> {
  debugger;
  const orderedJson: Record<string, any> = {}; // Create a new object to store the reordered data
  
  // Get the keys and sort them
  const keys = Object.keys(jsonData).sort();
  
  // Populate the ordered object with sorted keys
  keys.forEach(key => {
    orderedJson[key] = jsonData[key];
  });
  
  return orderedJson;
}

  /* Function to format JSON to schema */
  fixSpaceAndLineschema() {
    try {
      const parsedData = JSON.parse(this.schemaInTextarea);
      if (typeof parsedData === 'object') {
        const orderedData = this.newFixTextSchema(parsedData); // Call the function to reorder key-value pairs
        const formattedData = JSON.stringify(orderedData, null, 2);
        this.schemaInTextarea = formattedData;
      } else {
        console.log('Invalid JSON object');
      }
    } catch (error) {
      console.log('Error parsing JSON:', error);
    }
  }
  
  /* Function to reorder key-value pairs */
  newFixTextSchema(jsonData: Record<string, any>): Record<string, any> {
    const orderedJson: Record<string, any> = {}; // Create a new object to store the reordered data
    
    // Get the keys and sort them
    const keys = Object.keys(jsonData).sort();
    
    // Populate the ordered object with sorted keys
    keys.forEach(key => {
      orderedJson[key] = jsonData[key];
    });
    
    return orderedJson;
  }

  /* remove text from textarea */
  // Function to clear the textarea, reset line numbers, and clear uploaded file
  clearTextareaAndLineNumbersJson() {
    // Clear the textarea by setting its value to an empty string
    this.dataInTextarea = '';

    // Clear the previous content and row indexes in lineCounter
    const lineCounter = this.el.nativeElement.querySelector('#lineCounter');
    lineCounter.innerHTML = '';
    this.rowIndexes = []; // Assuming you have a variable like this.rowIndexes

    // Clear the uploaded file input
    const fileInput = this.el.nativeElement.querySelector('#fileInput');
    fileInput.value = '';

    // Additional logic to reset other states or buttons can be added here
  }

  clearTextareaAndLineNumbersSchema() {
    // Clear the textarea by setting its value to an empty string
    this.schemaInTextarea = '';
    // Clear the previous content and row indexes in lineCounter
    const lineCounter = this.el.nativeElement.querySelector('#lineCounter2');
    lineCounter.innerHTML = '';
    this.rowIndexes2 = []; // Assuming you have a variable like this.rowIndexes

    // Clear the uploaded file input
    const fileInput = this.el.nativeElement.querySelector('#fileInput2');
    fileInput.value = '';

    // Additional logic to reset other states or buttons can be added here
  }

}

  

