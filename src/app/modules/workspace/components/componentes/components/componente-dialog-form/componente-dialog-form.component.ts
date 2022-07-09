import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import icSubject from '@iconify/icons-ic/twotone-subject';
import icShortText from '@iconify/icons-ic/twotone-short-text';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import icDelete from '@iconify/icons-ic/twotone-delete';

import { environment } from '../../../../../../../environments/environment';
// services
import { ComponenteService } from '../../../../../../core/services/componente/componente.service';
// models
import { Componente } from 'src/app/core/models/componente/componente';


@Component({
  selector: 'vex-componente-dialog-form',
  templateUrl: './componente-dialog-form.component.html',
  styleUrls: ['./componente-dialog-form.component.scss']
})
export class ComponenteDialogFormComponent implements OnInit {
  componente: Componente;
  form: FormGroup;
  environment = environment;
  action = 'new';

  statusButtonSave: FormControl = new FormControl(false);
  // ----------------------
  icMoreVert = icMoreVert;
  icClose = icClose;
  icSubject = icSubject;
  icShortText = icShortText;
  icDelete = icDelete;
  constructor(
    private _componenteService: ComponenteService,
    private dialogRef: MatDialogRef<ComponenteDialogFormComponent>,
    private _formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    this.componente = _data.componente;

    if (this.componente) {
      this.action = 'edit';
      this.form = this.createForm();
      this.form.patchValue(this.componente);
    } else {
      this.form = this.createForm();
    }

    if (this.componente && !this.componente?.esActivo) {
      this.form.disable();
    }
  }

  ngOnInit(): void {
  }
  createForm(): FormGroup {
    return new FormGroup({
      id: new FormControl('', []),
      codigo: new FormControl({ value: this.componente?.codigo, disabled: true }, []),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      referencia: new FormControl('', [Validators.maxLength(1000)]),
    });
  }
  fnAction() {
    if (this.action === 'new') {
      this.fnAdd(event);
    }
    if (this.action === 'edit') {
      this.fnEdit(event);
    }
  }
  fnEdit(event: Event) {
    if (!this.componente.esActivo) {
      this.statusButtonSave.setValue(false); // volvemos a status ocioso el spinner del button save
      return false;
    }

    if (this.form.valid) {
      const entidad = Object.assign({}, this.form.value);
      this._componenteService.putUpdate(entidad).then((value: any) => {
        if (value.success) {
          this.snackbar.open('Se guardó con éxito.', 'Éxito!', {
            duration: 2500
          });
          this.dialogRef.close({
            action: 'edit',
            componente: entidad
          });
        } else {
          this.snackbar.open(value?.messages?.join(', '), 'Aviso!', {
            panelClass: 'bg-deep-orange-500',
            duration: 3500
          });
        }
        this.statusButtonSave.setValue(false); // volvemos a status ocioso el spinner del button save
      }).catch((error) => {
        this.snackbar.open(error.message, 'Aviso!', {
          panelClass: 'bg-deep-orange-500',
          duration: 3500
        });
        this.statusButtonSave.setValue(false); // volvemos a status ocioso el spinner del button save
      });
    } else {
      this.form.markAllAsTouched();
      this.statusButtonSave.setValue(false); // volvemos a status ocioso el spinner del button save
    }
  }
  fnAdd(event: Event) {
    if (this.form.valid) {
      const entidad = Object.assign({}, this.form.value) as Componente;
      this._componenteService.postAdd(entidad).then((value: any) => {
        if (value.success) {
          const result = JSON.parse(value.data);
          this.action = 'edit';
          this.form.controls.id.setValue(result.key);
          entidad.id = result.key;
          entidad.codigo = result.codigo;
          this.componente = entidad;
          this.snackbar.open('Se guardó con éxito.', 'Éxito!', {
            duration: 2500
          });
          this.dialogRef.close({
            action: 'new',
            indicador: this.componente
          });
        } else {
          this.snackbar.open(value?.messages?.join(', '), 'Aviso!', {
            panelClass: 'bg-deep-orange-500',
            duration: 3500
          });
        }

        this.statusButtonSave.setValue(false); // volvemos a status ocioso el spinner del button save
      }).catch((error) => {
        this.snackbar.open(error.message, 'Aviso!', {
          panelClass: 'bg-deep-orange-500',
          duration: 3500
        });
        this.statusButtonSave.setValue(false); // volvemos a status ocioso el spinner del button save
      });
    } else {
      this.form.markAllAsTouched();
      this.statusButtonSave.setValue(false); // volvemos a status ocioso el spinner del button save
    }
  }
  save() {
    this.dialogRef.close();
  }
}
