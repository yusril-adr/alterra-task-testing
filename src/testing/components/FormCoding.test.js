import { fireEvent } from '@testing-library/react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import FormCoding from '../../components/FormCoding';

describe('When FormCoding Component is rendered', () => {
  let container = null;
  beforeEach(() => {
  // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
  // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('will renders form with "Pendaftaran Peserta Coding Bootcamp" Title', () => {
    act(() => {
      render(<FormCoding />, container);
    });
    expect(container.querySelector('h1').textContent).toBe('Pendaftaran Peserta Coding Bootcamp');
  });

  it('will renders 7 <input> tag', () => {
    act(() => {
      render(<FormCoding />, container);
    });
    expect(container.querySelectorAll('input').length).toBe(7);
  });

  it('will renders success alert when all input is valid', () => {
    act(() => {
      render(<FormCoding />, container);
    });

    const nameInput = document.querySelector('input[name=nama]');
    fireEvent.change(nameInput, { target: { value: 'Yusril' } });

    const emailInput = document.querySelector('input[name=email]');
    fireEvent.change(emailInput, { target: { value: 'yusril@email.com' } });

    // Invalid input
    const phoneInput = document.querySelector('input[name=noHandphone]');
    fireEvent.change(phoneInput, { target: { value: '081111111' } });

    const pendidikanInput = document.querySelector('input[name=pendidikan]');
    fireEvent.click(pendidikanInput);

    const courseInput = document.querySelector('select[name=kelas]');
    fireEvent.change(courseInput, { target: { value: 'reactjs' } });

    const kesungguhanFileInput = document.querySelector('input[name=suratKesungguhan]');
    fireEvent.change(kesungguhanFileInput, { target: { files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })] } });

    const button = document.querySelector('input[type=submit]');
    act(() => {
      fireEvent.click(button);
    });

    // Cek apakah tidak ada error yang tampil
    expect(container.querySelectorAll('ul li').length).toBe(0);
  });

  it('will renders error when phone number is invalid', () => {
    act(() => {
      render(<FormCoding />, container);
    });

    const nameInput = document.querySelector('input[name=nama]');
    fireEvent.change(nameInput, { target: { value: 'Yusril' } });

    const emailInput = document.querySelector('input[name=email]');
    fireEvent.change(emailInput, { target: { value: 'yusril@email.com' } });

    // Invalid input
    const phoneInput = document.querySelector('input[name=noHandphone]');
    fireEvent.change(phoneInput, { target: { value: '111' } });

    const pendidikanInput = document.querySelector('input[name=pendidikan]');
    fireEvent.click(pendidikanInput);

    const courseInput = document.querySelector('select[name=kelas]');
    fireEvent.change(courseInput, { target: { value: 'reactjs' } });

    const kesungguhanFileInput = document.querySelector('input[name=suratKesungguhan]');
    fireEvent.change(kesungguhanFileInput, { target: { files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })] } });

    const button = document.querySelector('input[type=submit]');
    act(() => {
      fireEvent.click(button);
    });

    expect(container.querySelector('ul li').textContent).toBe('No Handphone Tidak Sesuai');
  });
});
