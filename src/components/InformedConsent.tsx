'use client';

import React, { useRef, useState } from 'react';
import { FaCheck, FaTimes, FaDownload } from 'react-icons/fa';

type ConsentMethod = 'signature' | 'upload';

interface InformedConsentProps {
  medicalRecordId?: number;
  patientName?: string;
  patientDocument?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  onSubmit?: (data: {
    patientName: string;
    patientDocument: string;
    signatureBase64: string;
  }) => void;
  initialName?: string;
  initialDocument?: string;
}

const InformedConsent: React.FC<InformedConsentProps> = ({
  medicalRecordId,
  patientName: propPatientName,
  patientDocument: propPatientDocument,
  onSuccess,
  onCancel,
  onSubmit,
  initialName = '',
  initialDocument = '',
}) => {
  const [method, setMethod] = useState<ConsentMethod>('signature');
  const [localName, setLocalName] = useState(initialName);
  const [localDocument, setLocalDocument] = useState(initialDocument);
  const [signature, setSignature] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isExistingRecord = !!medicalRecordId;

  const displayPatientName =
    isExistingRecord ? propPatientName : localName || '____________________________________________________';

  const displayPatientDocument =
    isExistingRecord ? propPatientDocument : localDocument || '___________________';

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;

    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature(null);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    setSignature(dataUrl);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (method === 'signature' && !signature) {
      alert('Por favor, firme el documento');
      return;
    }

    if (method === 'upload' && !file) {
      alert('Por favor, seleccione un archivo');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isExistingRecord) {
        if (method === 'signature') {
          const response = await fetch('/api/consent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              medicalRecordId,
              signedByName: propPatientName,
              signedByDocument: propPatientDocument,
              signatureBase64: signature,
            }),
          });

          if (!response.ok) {
            throw new Error('Error al guardar el consentimiento');
          }
        } else {
          const formData = new FormData();

          formData.append('medicalRecordId', String(medicalRecordId));
          formData.append('signedByName', propPatientName || '');
          formData.append('signedByDocument', propPatientDocument || '');
          formData.append('file', file as Blob);

          const response = await fetch('/api/consent', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Error al subir el archivo');
          }
        }

        alert('Consentimiento guardado exitosamente');
        onSuccess?.();
      } else {
        if (!localName.trim() || !localDocument.trim()) {
          alert('Debe ingresar nombre y documento del paciente');
          setIsSubmitting(false);
          return;
        }

        if (method === 'signature') {
          onSubmit?.({
            patientName: localName,
            patientDocument: localDocument,
            signatureBase64: signature as string,
          });
        } else {
          alert('Modo sin ID con archivo no soportado en esta versión');
          setIsSubmitting(false);
          return;
        }
      }
    } catch (error) {
      console.error(error);
      alert('Error al guardar el consentimiento');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#bec5a4] to-[#a0a78c] bg-clip-text text-transparent">
            Consentimiento Informado
          </h2>

          <div className="flex gap-2">
            <a
              href="/CONSENTIMIENTO INFORMADO ATENCIÓN PRESENCIAL .docx"
              download
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
              title="Descargar plantilla para diligenciar"
            >
              <FaDownload />
            </a>

            <button
              type="button"
              onClick={onCancel}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <FaTimes className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex border-b border-gray-200 mb-6">
          <button
            type="button"
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              method === 'signature'
                ? 'border-b-2 border-[#bec5a4] text-[#bec5a4]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setMethod('signature')}
          >
            Firma digital
          </button>

          <button
            type="button"
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              method === 'upload'
                ? 'border-b-2 border-[#bec5a4] text-[#bec5a4]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setMethod('upload')}
          >
            Subir archivo firmado
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-sm text-gray-800 leading-relaxed">
            <h3 className="text-center font-bold text-lg mb-5 uppercase">
              Consentimiento Informado para Atención Psicológica
            </h3>

            <p>
              <strong>FECHA:</strong> ____ / ____ / ____
            </p>

            <p>
              <strong>CIUDAD;</strong> Quibdó, Chocó: ____________________
            </p>

            <p className="mt-4">
              Yo, <strong>{displayPatientName}</strong> mayor de edad,
              identificado(a) con la cédula número{' '}
              <strong>{displayPatientDocument}</strong>, por medio de este
              documento declaro que acepto de manera voluntaria recibir atención
              psicológica por parte de la psicóloga{' '}
              <strong>LIYIVETH QUINTERO GARCÍA</strong>, identificada con C.C.
              1.077.465.202 y Tarjeta Profesional No. 229742
            </p>

            <p className="mt-4 font-semibold">
              Entiendo y acepto las siguientes condiciones del servicio:
            </p>

            <ol className="list-decimal pl-5 space-y-3 mt-3">
              <li>
                <strong>Confidencialidad:</strong> Toda la información compartida
                en las sesiones está protegida por el secreto profesional (Ley
                1090 de 2006). Solo podrá ser revelada en las excepciones que la
                ley colombiana establece: cuando exista un riesgo inminente para
                mi integridad física o la de terceros, o por requerimiento
                judicial expreso.
              </li>

              <li>
                <strong>Autonomía:</strong> Tengo el derecho de realizar todas
                las preguntas que considere necesarias sobre mi proceso, las
                técnicas utilizadas y los objetivos terapéuticos. Así mismo,
                puedo dar por terminada la relación profesional en el momento que
                lo desee.
              </li>

              <li>
                <strong>Calidad de la Atención:</strong> Recibiré un trato
                digno, respetuoso y basado en principios éticos y científicos,
                orientado siempre hacia mi bienestar y autonomía emocional.
              </li>

              <li>
                <strong>Tratamiento de Datos Personales:</strong> Autorizo a la
                profesional Liyiveth Quintero García para recolectar, almacenar y
                utilizar mis datos personales y de contacto exclusivamente para
                fines de registro en la historia clínica, agendamiento de citas y
                comunicaciones relacionadas con el proceso terapéutico, bajo las
                normas de protección de datos (Ley 1581 de 2012).
              </li>

              <li>
                <strong>Honorarios:</strong> Me comprometo a cumplir con los
                pagos acordados por concepto de honorarios profesionales en los
                tiempos y medios establecidos.
              </li>
            </ol>

            <p className="mt-4">
              Al firmar, confirmo que he leído y comprendido la totalidad de este
              documento, que he podido aclarar mis dudas y que acepto los términos
              aquí descritos de manera consciente y voluntaria.
            </p>

            <div className="mt-6">
              <p className="font-semibold">FIRMA DEL PACIENTE:</p>
              <p className="mt-6">________________________________________</p>
              <p className="mt-2">C.C. No. ____________________</p>
            </div>

            <div className="mt-6">
              <p className="font-semibold">FIRMA DE LA PROFESIONAL:</p>
              <p className="mt-4 font-semibold">LIYIVETH QUINTERO GARCÍA</p>
              <p>Psicóloga | T.P. No. 229742</p>
            </div>
          </div>

          {!isExistingRecord && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-800">
                  Nombre del paciente <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  value={localName}
                  onChange={(e) => setLocalName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#bec5a4] focus:ring-2 focus:ring-[#bec5a4]/20 bg-white text-gray-800"
                  placeholder="Ej. Juan Pérez"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-800">
                  Documento de identidad <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  value={localDocument}
                  onChange={(e) => setLocalDocument(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#bec5a4] focus:ring-2 focus:ring-[#bec5a4]/20 bg-white text-gray-800"
                  placeholder="Ej. 123456789"
                  required
                />
              </div>
            </div>
          )}

          {method === 'signature' ? (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-800">
                Firma del paciente / consultante
              </label>

              <div className="border border-gray-300 rounded-xl p-2 bg-white">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={200}
                  className="w-full h-40 border border-gray-200 rounded-lg cursor-crosshair touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  onTouchCancel={stopDrawing}
                />
              </div>

              <div className="flex justify-between mt-2">
                <button
                  type="button"
                  onClick={clearSignature}
                  className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
                >
                  <FaTimes className="mr-1" /> Limpiar
                </button>

                <button
                  type="button"
                  onClick={saveSignature}
                  className="text-sm bg-[#bec5a4] text-white px-3 py-1 rounded-lg hover:bg-[#a0a78c] flex items-center"
                >
                  <FaCheck className="mr-1" /> Guardar firma
                </button>
              </div>

              {signature && (
                <p className="text-sm text-green-600 mt-2">
                  ✓ Firma guardada
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-800">
                Subir archivo del consentimiento firmado PDF, imagen o DOCX
              </label>

              <div className="border border-gray-300 rounded-xl p-4 bg-white">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png,.docx"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#bec5a4] file:text-white hover:file:bg-[#a0a78c]"
                />

                {file && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ Archivo seleccionado: {file.name}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <p className="text-center text-gray-600">
              _____________________________________
            </p>
            <p className="text-center text-sm">Firma de la Profesional</p>
            <p className="text-center text-sm font-semibold">
              LIYIVETH QUINTERO GARCÍA
            </p>
            <p className="text-center text-sm">
              Psicóloga | T.P. No. 229742
            </p>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gradient-to-r from-[#bec5a4] to-[#a0a78c] text-white rounded-xl hover:from-[#a0a78c] hover:to-[#8a9379] disabled:opacity-50"
            >
              {isSubmitting ? 'Guardando...' : 'Aceptar y Firmar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformedConsent;