import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import MarcarCirculo from '../../views/MarcarCirculo.vue'

describe('MarcarCirculo', () => {
  const wrapper = mount(MarcarCirculo)

  it('Renderizando componente corretamente', () => {
    expect(wrapper.html()).toContain("Desenhar Círculo")
  })

  it('Deve desenhar um círculo ao clicar no SVG', async () => {
    const svgElement = wrapper.vm.svgRef;
    const rect = svgElement.getBoundingClientRect();
    const clientX = rect.left + 50; // Define a posição X para o centro do SVG
    const clientY = rect.top + 50; // Define a posição Y para o centro do SVG

    await svgElement.dispatchEvent(new MouseEvent('click', { clientX, clientY }));

    // Verificar se o círculo foi adicionado corretamente à lista de círculos
    const circles = wrapper.vm.circles;
    expect(circles).toHaveLength(1);

    // Verificar as propriedades do círculo adicionado
    const circle = circles[0];
    expect(circle).toEqual(expect.objectContaining({
      cx: expect.any(Number),
      cy: expect.any(Number),
      r: expect.any(Number),
    }));

    // Verificar se o raio do círculo está correto
    expect(circle.r).toBe(30);
  });
})